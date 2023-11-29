package com.swugether.server.domain.MyPage.api;

import com.swugether.server.domain.MyPage.application.MypageService;
import com.swugether.server.domain.MyPage.dto.MyPostListDto;
import com.swugether.server.global.base.dto.DataResponseDto;
import com.swugether.server.global.base.dto.ResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/mypage")
public class MypageController {
    private final MypageService mypageService;

    @Autowired
    public MypageController(MypageService mypageService) {
        this.mypageService = mypageService;
    }

    // 내가 쓴 글
    @GetMapping("/post")
    public ResponseEntity<ResponseDto> postList(@RequestHeader("Authorization") String bearer_token) {
        MyPostListDto myPostListDto = mypageService.listService(bearer_token);

        if (myPostListDto.getList().size() == 0)
            return ResponseEntity.ok(ResponseDto.of(200, "No result."));
        else
            return ResponseEntity.ok(DataResponseDto.of(myPostListDto));
    }
}
