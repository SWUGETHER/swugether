package com.swugether.server.domain.Post.dto;

import com.swugether.server.domain.Post.domain.ContentEntity;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class PostDto {
    private Long post_id;
    private Long user_id;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    private String title;
    private String content;
    private Integer like_count;
    private ArrayList<ImageDto> images;
    private Boolean is_liked;

    @Builder
    public PostDto(ContentEntity content, ArrayList<ImageDto> images, Boolean is_liked) {
        this.post_id = content.getId();
        this.user_id = content.getUser().getId();
        this.created_at = content.getCreatedAt();
        this.updated_at = content.getUpdatedAt();
        this.title = content.getTitle();
        this.content = content.getContent();
        this.like_count = content.getLikeCount();
        this.images = images;
        this.is_liked = is_liked;
    }
}
