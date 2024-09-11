package quixotic.personnal.passvault.exception.badRequestException;


import static org.springframework.http.HttpStatus.BAD_REQUEST;
import quixotic.personnal.smartcardapi.exception.APIException;

public class BadRequestException extends APIException {
    public BadRequestException(String message) {
        super(BAD_REQUEST, message);
    }
}
