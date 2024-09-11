package quixotic.personnal.passvault.exception.forbiddenRequestExceptions;


import quixotic.personnal.smartcardapi.exception.APIException;

import static org.springframework.http.HttpStatus.FORBIDDEN;

public class ForbiddenRequestException extends APIException {
    public ForbiddenRequestException(String message) {
        super(FORBIDDEN, message);
    }
}
