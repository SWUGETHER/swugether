import easyocr
import cv2
import matplotlib.pyplot as plt
import numpy as np
from PIL import ImageFont, ImageDraw, Image
import os
import uuid

# 현재 파일 경로
_PATH = os.path.dirname(os.path.abspath(__file__))

def read_image(image_path):
    file_name = uuid.uuid4()

    # EasyOCR 객체 생성
    reader = easyocr.Reader(['ko', 'en'], gpu=True)

    # 이미지 파일 OpenCV로 불러오기
    image = cv2.imread(image_path)

    # 이미지 파일 OR URL로부터 텍스트 추출
    result = reader.readtext(image)

    # 추출된 텍스트 표시
    for detection in result:
        file_name = uuid.uuid4()
        text = detection[1]
        confidence = detection[2]
        bbox = np.array(detection[0], dtype=np.int32)

        # 텍스트 주위에 네모박스 그리기
        cv2.polylines(image, [bbox], isClosed=True, color=(255, 0, 0), thickness=2)
        
        # font 파일 경로
        font_path = _PATH + "/fonts/D2Coding-Ver1.3.2-20180524-all.ttc"
        font_size = 50
        # font 로드
        font = ImageFont.truetype(font_path, font_size)
        # text 크기 가져옴
        text_width, text_height = font.getsize(text)
        
        # OpenCV 이미지 -> PIL 이미지 변환
        # OpenCV: 이미지를 Numpy로 처리하는 라이브러리 -> 컴퓨터 비전 작업
        # PIL(Python Imaging Library): 이미지 처리에 특화된 라이브러리 -> 이미지 조작 및 그래픽 작업
        pil_image = Image.fromarray(image)
        draw = ImageDraw.Draw(pil_image)
        
        # 텍스트 주위에 사각형 그리기
        rect_start = (bbox[0][0], bbox[0][1] - text_height - 10)
        rect_end = (bbox[0][0] + text_width, bbox[0][1] - 5)
        draw.rectangle((rect_start, rect_end), fill=(255, 0, 0))
        
        # 텍스트 표시
        text_position = (bbox[0][0], bbox[0][1] - text_height - 5)
        draw.text(text_position, f"{text} ({confidence:.2f})", font=font, fill=(255, 255, 255))

        # PIL 이미지 -> OpenCV 이미지 변환
        image = np.array(pil_image)

    _file_name = "temp_data/" + f"{file_name}" + ".png"

    # 인식 이미지 저장
    plt.figure(figsize=(20, 20))
    plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB)) 
    plt.axis('off') # 축 제거
    plt.savefig(_file_name, format='png')

    for detection in result:
        text += detection[1]
    
    return text