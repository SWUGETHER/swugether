package com.swugether.server.domain.Post.domain;

import com.swugether.server.domain.Post.dto.ImageDto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface ImageRepository extends CrudRepository<ImageEntity, Long> {
    @Query("select new com.swugether.server.domain.Post.dto.ImageDto(i.id, i.imagePath) " +
            "from ImageEntity i " +
            "where i.post = :post")
    ArrayList<ImageDto> findAllByPost(ContentEntity post);

    ImageEntity findTopByPostOrderByIdAsc(ContentEntity post);
}
