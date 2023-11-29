package com.swugether.server.domain.Post.dto;

import com.swugether.server.domain.Auth.domain.UserEntity;
import com.swugether.server.domain.Post.domain.ContentEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.ArrayList;

@AllArgsConstructor
@Getter
public class NewPostRequestDto {
    @Size(max = 100)
    @NotBlank
    private String title;

    @NotBlank
    private String content;

    private ArrayList<MultipartFile> images;

    public ContentEntity toEntity(UserEntity user) {
        return ContentEntity.builder()
                .user(user)
                .title(this.title)
                .content(this.content)
                .build();
    }
}
