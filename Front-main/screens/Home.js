import React, { useRef, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image } from "react-native";
import Swiper from "react-native-swiper";
import { Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Home = () => {
    const navigation = useNavigation();
    const slideList = [
        {
            id: 1,
            title: "생리대 착용 방법",
            date: '23.04.05',
            likeCount: '203',
            text: "1. 개별 포장지를 뜯어 생리대를 펼쳐줍니다.\n" +
            "2. 생리대를 팬티에 붙입니다.\n" +
            "3. 속옷을 감싸듯이 날개를 반대편으로 접어주고, 두 겹으로 된 위생 팬티라면 날개를 안으로 넣어주세요.\n" +
            "4. 날개형 생리대는 날개와 팬티의 가장 좁은 부분을 맞춰주세요.\n" +
            "5. 팬티를 입은 뒤 생리혈이 밖으로 새지 않도록 생리대가 알맞게 접착 되었는지 상태를 확인해주세요.\n" +
            "6. 잠잘 때의 경우에는 생리대를 팬티 기준으로 중간 지점에서 엉덩이쪽(아래쪽)으로 착용하고 자면 됩니다.\n" +
            "잘 때는 생리가 샐 수 있기 때문에 일반 생리대보다 더 큰 오버나이트형을 착용하거나 일반 생리대 두 개를 넓게 착용하시면 됩니다.",
            image: require('../assets/example3.png'), // 이미지 경로
        },
        {
            id: 2, 
            title: "여성 용품 종류",
            date: '23.04.04',
            likeCount: '188',
            text: '1. 패드형 생리대- 일회용 생리대 \n'+
            '가장 많이, 일반적으로 사용하는 생리대의 종류입니다.\n'+
            '패드형 생리대 중 일회용 생리대는 접착면을 속옷에 붙여서 혈을 흡수할 수 있도록 만들어진 제품입니다.\n'+
            '월경의 양이나 용도에 따라서 소형, 중형, 대형, 오버나이트로 나누어져 있어 본인의 생리양에 맞게 크기를 선택할 수 있으며,\n'+
            ' 2~3시간마다 한 번씩 교체를 해주는 것이 위생상 좋습니다.\n\n'+

            '2. 패드형 생리대 - 다회용 생리대\n'+
            '일회용 생리대와는 다르게 공기가 잘 통하는 순면으로 제작된 제품으로, 세탁을 해서 몇 차례 사용을 할 수 있는 것이 특징입니다. \n'+
            '면생리대라고 통칭하며, 이의 경우에는 일회용 생리대에 비해서 흡수율이 떨어지기 때문에 축축한 상태로 계속 사용을 하게 되면 피부에 자극이 갈 수 있습니다.\n'+
            '세제를 사용하여 세탁한 후의 잔여물도 피부에 자극이 될 수 있으니 꼼꼼하게 잘 헹궈서 사용하는 것이 중요합니다.\n'+
            ' 요즘들어 여성들이 많이 사용을 하는 추세입니다.\n\n'+

            '3.팬티라이너\n'+
            '패드형 생리대와 비슷한 듯 하지만 그에 비해 조금은 크기가 작은 제품입니다.\n'+
            '이는 월경 전후 질 분비물이 많이 나오는 때에 사용을 하는 제품입니다.\n'+
            '일반적인 생리혈 흡수를 목적으로 만들어진 제품이 아니기 때문에 매우 얇은 것이 특징입니다. \n'+
            '분비물이 묻어 나왔을 때에는 즉시 갈아주는 것이 좋으며, 장시간 착용하게 되면 습기로 인해 염증이 발생할 수 있으니 하루 3번 이상 교체하는 것을 권고합니다.\n\n'+

            '4. 팬티형 생리대- 일회용 생리대\n'+
            '팬티처럼 입는 생리대 제품입니다.\n'+
            ' 패드형에 비해 면적이 넓어 샘 걱정을 줄일 수 있고, 눕거나 엎드리는 등의 자세를 취했을 때에도 생리가 새는 위험 부담을 줄일 수 있습니다.\n'+
            '착용을 한 후 세탁을 할 일이 없기 때문에 간편한 처리도 가능한 타입이며,  대게는 양이 많은 날, 뒤척임이 많은 밤에 착용을 많이 하는 제품입니다.\n',
            image: require('../assets/example.png'),
        },
        {
            id: 3,
            title: "여성 용품 종류_ 체내 삽입형",
            date: '23.04.04',
            likeCount: '200',
            text: 
            '5. 체내 삽입형 생리대 - 탐폰\n'+
            '속옷에 부착하는 형태와는 조금 다르게 질 안에 삽입하는 형식의 생리대입니다. \n'+
            '이는 질 안으로 삽입해서 생리혈을 흡수하는 방식이며, 보통 수영이나 물에 들어가야 하는 일이 있을 때 혹은 운동할 때 사용하는 경우가 많습니다.\n'+
            '탐폰은 반드시 손을 깨끗하게 씻은 후 사용을 해야 하며, 장시간 사용 시 질 내부가 건조해질 수 있기 때문에 월경의 양에 맞게 2~4시간마다 한 번씩 교체를 해주는 것이 좋습니다.\n'+
            '수영장이나 바다와 같이 물에 들어갔다 나왔을 경우에는 즉시 교체해주는 것을 권장합니다. 그리고 만약 사용을 할 때 이물감이나 통증이 느껴진다면 바로 제거하고 다른 제품을 사용해야 합니다.\n'+
            '흔한 경우는 아니지만, 장시간 사용 시 고열, 근육통, 어지러움 등의 증상인 ‘독성쇼크증후군(TSS)’과 같은 부작용이 발생할 수 있기 때문에 주의해야 합니다.\n'+
            '만약 이러한 증상이 발생하게 되면 즉시 제품을 제거한 후 병원에 내원해 상담을 받는 것이 좋아요.\n\n'+
            
            '6.체내 삽입형 생리대- 생리컵\n'+
            '생리컵은 흐르는 월경혈을 컵에 모드는 원리입니다.\n'+
            ' 또한, 자신에게 맞는 컵의 종류, 크기를 잘 골라서 사용하는 것이 매우 중요합니다\n'+
            '생리컵 역시 삽입형이기 때문에 사용 혹은 교체 전 반드시 깨끗하게 손을 씻으면서 위생을 철저하게 지켜주어야 합니다.\n'+
            '관리 또한  삶아서 세척한 후 멸균해야 하며,  평균적으로 한 번에 8시간~12시간 정도 사용이 가능합니다.  \n'+
            '하지만 삽입 후 이물감이나 통증이 느껴진다면 즉시 제거 후 전문의와 상담을 한 후 사용할 필요가 있습니다.\n',
            image: require('../assets/example.png'),
        },
        {
            id: 4,
            title: "생리대 사용시 주의 사항",
            date: '23.04.04',
            likeCount: '195',
            text: '1. 생리대 교체는 2~3시간에 한번씩 하기!\n'+
            '양이 많은 날을 기준으로 2~3시간에 한 번씩은 생리대를 교체해주는 것이 위생상 좋습니다. \n'+
            '만약 교체하지 않고 장시간 같은 생리대를 계속 사용한다면 생리대에 흡수된 분비물이 피부와 계속 맞닿으면서 각종 질환을 유발할 수 있습니다.\n'+
            '그리고 면 생리대를 사용한다면 축축함이 일회용 생리대보다 더욱 클 수 있기 때문에 더 자주 교체해주는 것이 좋습니다.\n'+
            ' 하지만 이는 모두 평균적인 것일 뿐 본인의 월경량에 맞춰서 적절하게 교체해주어야 한다는 점이 가장 중요합니다.\n\n'+
            '2. 월경 중에는 흐르는 물로 씻으며 청결을 유지해주세요!\n'+
            '월경 기간 중에는 세균 감염에 노출되기가 쉽기 때문에 월경을 하는 기간 동안에는 대중목욕탕 혹은 수영은 피하는 것이 좋으며, \n'+
            '바디워시, 비누, 세정제 등을 사용하기 보다는 흐르는 물로만 씻어주는 것이 좋습니다.\n'+
            ' 만약 피치못할 사정으로 혹은 냄새에 너무 예민한 경우라면 약산성으로 만들어진 청결제를 사용하길 권장합니다.\n\n'+
            '3. 보관 시 직사광선, 습한 장소는 피하기 \n'+
            ' 생리대는 습기와 온도에 매우 예민한 제품입니다.  \n'+
            '그렇기 때문에 보관할 때에는 직사광선이나 고온 다습한 장소는 피하는 것이 좋습니다.\n'+
            '그래서 이물질 혹은 벌레 등이 들어가지 않도록 단단하고 밀폐된 용기에 넣어 보관하고,\n'+
            ' 휴대 시에는 화장품이나 필기 용품과 섞여 오염되지 않도록 지퍼가 달린 파우치에 가지고 다니는 것을 추천합니다.\n\n'+
            '4. 생리대 제거는 꼭 휴지통에 하기',
            image: require('../assets/example2.png'),
        },
        {
            id: 5,
            title: "냉에 관한 오해와 진실",
            date: '23.04.04',
            likeCount: '195',
            text: 'Q1.질 분비물(냉)이 많으면 질염일까?\n'+
            '폐경 전, 즉 가임기 여성은 하루 분비물은 2cc 에서 4cc정도 누구나 있는 게 정상입니다.\n'+
            '그리고 생리주기에 따라서, 상황에 따라서 이 분비물이 정상적으로도 좀 많아지는 경우가 있습니다.\n'+
            '예를 들어 배란기에는 계란흰자 같은 약간 점액질의 맑은 분비물이 다량으로 분비가 되는 게 정상적입니다.\n'+
            ' 또 생리 전이나 임신 중에는 분비물이 다소 늘어날 수 있습니다. \n'+
            ' 그 외에도 다이어트, 잦은 성관계, 과도한 스트레스, 경구 피임약 같은 호르몬 치료를 받는 경우에는 분비물의 색깔, 성상, 특징이 좀 변화가 있을 수 있습니다. \n'+
            '그래서 변화가 있다고 해서 질염이라고 속단하기 어렵습니다.\n\n'+

            'Q2. 물 같은 냉이 나오는데 정상일까? \n'+
            '배란기에는 물 같은 냉이 나오는 것이 정상이라고 할 수 있습니다. \n'+
            '특히 배란기에는 보통은 투명하고 별로 냄새는 없고 약간 점액성을 띤 그런 다량의 분비물이 나오는 것은 정상입니다.\n'+
            '이제 이런 분비물이 배란기도 아닌데 계속 나오거나, 아니면 따끔따끔하고 간지럽고 혹은 다른 증상을 수반된다면, 병원에 가서 진단을 받을 필요가 있습니다.\n'+
            '일반적으로 배란기라고 하면 약간 배란통이 있는 경우도 있으니까 본인의 생리 주기와 잘 비교해서 판단할 필요가 있습니다.\n'+
            ' 다만 물같은 냉에 다른 이물질이 같이 섞여 나오는 증상을 겪는다면 이것은 다른 질염을 동반했을 가능성이 더 크기 때문에 그때는 산부인과 진료를 받을 필요가 있습니다.\n'+
            
            'Q3. 질 분비물 냄새, 무조건 질염인가 \n'+
            '사실 질의 산성도는 약 PH4.0에서 4.5 정도의 약산성을 가지고 있기 때문에 살짝 시큼한 냄새가 나거나, 요구르트 냄새 정도 느낄 수 있습니다.\n'+
            ' 그래서 이런 정도의 냄새는 반드시 질염이라고는 할 수 없지만,\n'+
            '냄새의 강도가 높아진다면 이건 일반적으로 세균성 질병이나 다른 질염으로 인한 냄새일 가능성이 큽니다.\n'+
            '냄새를 없애기 위해서 이너퍼퓸을 사용하는 여성들이 존재하는데,\n'+
            '이 또한 적절히 사용해서 이것으로 인한 자극성 접촉 피부염, 혹은 알레르기성 접촉 피부염으로 과 같은 염증을 유발하지 않도록 조심할 필요가 있습니다.\n\n'+
            'Q4.노란 냉, 녹생 냉, 피가 섞인 냉이 나온다면?\n'+
            '정상적으로 질 분비물은 살짝 연노란색을 띨 수 있습니다.\n'+
            '하지만 너무 색깔이 진해서 완전히 노란색, 혹은 초록색 냉이 나온다면 이건 질염의 증상일 수 있으면, 병원에 내원해 진료를 받는 것을 권장합니다.\n'+
            '그리고 특히 배란기에 생리 기간은 아니지만 피가 섞인 혈이 나오는 증상을 가진 여성분들이 존재합니다. \n'+
            '물론 배란되기 24시간 전에 에스트로겐이라는 호르몬 농도가 살짝 떨어지면서 이렇게 배란기 질출혈이 소량 있을 수는 있습니다.\n'+
            ' 하지만, 이런 정상정인 이유와는 다르게 자궁 내막 용종, 감염, 혹은 자궁근종 같은 혹이 있거나, \n'+
            '아니면 난소에 병변이 있는 경우에도 이렇게 질출혈이 유발될 수 있기 때문에 반드시 산부인과 진료가 필요합니다.\n'+
            '또 이 출혈이 단기성이 아니라 3일에서 5일 정도 유지되며 계속 길어 진다면 호르몬 불균형이 같이 동반된 경우도 있기 때문에 질출혈의 양에 상관없이 이때는 산부인과의 진료를 받길 권장합니다.\n\n',
            image: require('../assets/example4.jpg'),
        },
    ]; // 컨텐츠 리스트 

    const swiperRef = useRef(null);

    useEffect(() => {
        const autoAdvance = setInterval(() => {
            if (swiperRef.current) {
                const { index, total } = swiperRef.current.state;
                if (index < total - 1) {
                    swiperRef.current.scrollBy(1, true);
                } else {
                    swiperRef.current.scrollTo(0, true);
                }
            }
        }, 5000);
        
        return () => {
            clearInterval(autoAdvance);
        };
    }, []);

    function pressAllHandler() {
        // navigation.navigate('Contents');
        navigation.navigate('Contents');
    }

    function pressHandler(item) {
        navigation.navigate("Content", { item });
    }
 
    function pressCameraButton(){
        navigation.navigate("Camera");
    }


    return (
        <View style={styles.container}>
            <View style={styles.imageWrapper}>
                <Image
                    source={require('../assets/main_logo.png')}
                    style={styles.image}
                />
            </View>
            <View>
                <Text style={{fontSize: 34, fontWeight: "bold", left: 40, top: 40}}>Contents</Text>
            </View>
            <TouchableOpacity onPress={pressAllHandler}>
                <Text style={{fontSize: 16, left: 300, top: 10}}> 전체보기 {">"}</Text>
            </TouchableOpacity>
            <Swiper
                autoplay
                autoplayTimeout={5000}
                showsPagination={false}
                ref={swiperRef}
            >
                {slideList.slice(0, 3).map((slide) => (
                    <TouchableOpacity
                        key={slide.id} 
                        style={styles.slide}
                        onPress={() => pressHandler(slide)}
                    >   
                        <View style={styles.slideImageWrapper}>
                            <ImageBackground
                                source={slide.image}
                                style={styles.slideImage}
                            />
                        </View> 
                        <Text style={styles.title}>{slide.title}</Text>
                        <Text style={styles.date}>{slide.date}</Text>
                        <Text style={styles.likeCount}>{slide.likeCount}</Text>
                    </TouchableOpacity>
                ))}
            </Swiper>
              {/* Camera 버튼 */}
            <TouchableOpacity style={styles.cameraButton} onPress={pressCameraButton}>
                    <Icon name="camera" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        height: windowHeight,
        width: windowWidth,
        //marginTop: 30,
    },
    imageWrapper: {
        flex: 1,
        height: 300,
        backgroundColor: '#D9D9D9'
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    slide: {
        width: 330,
        height: 200,
        top: 50,
        left: 30,
        borderRadius: 20,
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        marginBottom: 19,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 4},
        shadowRadius: 4
    },
    slideImageWrapper: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        height: '100%',
        marginBottom: 50,
        overflow: 'hidden'
    },
    slideImage: {
        flex: 1,
        resizeMode: 'cover'
    },
    title: {
        position:'absolute', 
        fontSize: 20, 
        fontWeight:'bold', 
        bottom: 15, 
        left: 12
    },
    date: {
        position:'absolute', 
        fontSize: 14, 
        fontWeight:'bold', 
        bottom: 18, 
        right: 16
    },
    imageWrap: {
        height: 300,
        backgroundColor: '#979797',
    },
    image: {
        width: '100%',
        height: '100%'
    },
    likeCount: {
        position:'absolute', 
        fontSize: 14, 
        fontWeight:'bold', 
        top: 46, 
        right: 16
    },
    //camera
    cameraButton: {
        position: 'absolute',
        bottom: 20,
        right: 24,
        backgroundColor: '#979797',
        borderRadius: 50,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Home;