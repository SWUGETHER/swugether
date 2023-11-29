package com.swugether.server.domain.Auth.domain;

import org.springframework.data.repository.CrudRepository;

public interface RefreshTokenRepository extends CrudRepository<RefreshTokenEntity, Long> {
}
