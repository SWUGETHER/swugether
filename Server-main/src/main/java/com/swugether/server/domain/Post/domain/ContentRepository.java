package com.swugether.server.domain.Post.domain;

import com.swugether.server.domain.Auth.domain.UserEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ContentRepository extends CrudRepository<ContentEntity, Long> {
    List<ContentEntity> findAllByUserOrderByCreatedAtDesc(UserEntity user);

    List<ContentEntity> findAllByOrderByCreatedAtDesc();

    List<ContentEntity> findAllByOrderByCreatedAtAsc();

    List<ContentEntity> findAllByOrderByLikeCountDesc();
}
