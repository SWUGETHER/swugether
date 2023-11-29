package com.swugether.server.domain.Post.dto;

import com.swugether.server.domain.Post.domain.ContentEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
@Setter
public class SavedPostDto {
    private Long post_id;
    private Long user_id;
    private LocalDateTime created_at;
    private String title;
    private String content;
    private ArrayList<ImageDto> images;

    @Builder
    public SavedPostDto(ContentEntity content, ArrayList<ImageDto> images) {
        this.post_id = content.getId();
        this.user_id = content.getUser().getId();
        this.created_at = content.getCreatedAt();
        this.title = content.getTitle();
        this.content = content.getContent();
        this.images = images;
    }
}
