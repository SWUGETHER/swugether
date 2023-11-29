package com.swugether.server.domain.Post.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@DynamicUpdate
@Entity
@Table(name = "Image")
public class ImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private ContentEntity post;

    @Column(columnDefinition = "TEXT")
    private String imagePath;

    @Builder
    public ImageEntity(ContentEntity post, String imagePath) {
        this.post = post;
        this.imagePath = imagePath;
    }

    @Transactional
    public void updateImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}
