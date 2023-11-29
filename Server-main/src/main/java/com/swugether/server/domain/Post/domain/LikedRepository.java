package com.swugether.server.domain.Post.domain;

import com.swugether.server.domain.Auth.domain.UserEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface LikedRepository extends CrudRepository<LikedEntity, Long> {
    Boolean existsByUserAndPost(UserEntity user, ContentEntity post);

    List<LikedEntity> findAllByUser(UserEntity user);

    Optional<LikedEntity> findByUserAndPost(UserEntity user, ContentEntity post);
}
