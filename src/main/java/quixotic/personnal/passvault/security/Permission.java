package quixotic.personnal.passvault.security;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum Permission {
    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete"),
    USER_READ("user:read"),
    USER_UPDATE("user:update"),
    USER_CREATE("user:create"),
    USER_DELETE("user:delete"),
    VISITOR_READ("visitor:read"),
    VISITOR_UPDATE("visitor:update"),
    VISITOR_CREATE("visitor:create"),
    VISITOR_DELETE("visitor:delete")

    ;

    private final String permission;
}