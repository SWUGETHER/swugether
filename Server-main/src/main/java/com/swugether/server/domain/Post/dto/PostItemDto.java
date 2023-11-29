package com.swugether.server.domain.Post.dto;

import com.swugether.server.domain.Post.domain.ContentEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PostItemDto {
    private Long post_id;
    private LocalDateTime updated_at;
    private String title;
    private Integer like_count;
    private Boolean is_liked;
    private String thumbnail_image_path;

    @Builder
    public PostItemDto(ContentEntity content, Boolean is_liked, String thumbnail_image_path) {
        this.post_id = content.getId();
        this.updated_at = content.getUpdatedAt();
        this.title = content.getTitle();
        this.like_count = content.getLikeCount();
        this.is_liked = is_liked;
        this.thumbnail_image_path = thumbnail_image_path;
    }
}
