package com.swugether.server.domain.MyPage.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@NoArgsConstructor
@DynamicUpdate
@Getter
@Entity
@Table(name = "Notice")
public class NoticeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 100)
    @NotNull
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(length = 20)
    private String version;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Builder
    public NoticeEntity(String title, String content, String version) {
        this.title = title;
        this.content = content;
        this.version = version;
    }
}
