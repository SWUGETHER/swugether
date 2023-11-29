package com.swugether.server.domain.Auth.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "User")
@NoArgsConstructor
@DynamicInsert
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String email;
    @NotNull
    private String nickname;
    @NotNull
    private Boolean isAdmin;

    @Builder
    public UserEntity(String email, String nickname) {
        this.email = email;
        this.nickname = nickname;
        this.isAdmin = false;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj.getClass() != UserEntity.class) {
            return false;
        }

        UserEntity user = (UserEntity) obj;
        return Objects.equals(user.getId(), this.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email);
    }
}
