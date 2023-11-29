package com.swugether.server.domain.Post.domain;

import com.swugether.server.domain.Auth.domain.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@DynamicUpdate
@Getter
@Entity
@Table(name = "Liked")
public class LikedEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private UserEntity user;

    @ManyToOne(optional = false)
    private ContentEntity post;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @Builder
    public LikedEntity(UserEntity user, ContentEntity post) {
        this.user = user;
        this.post = post;
    }
}
