package quixotic.personnal.passvault.exception.goneRequestException;


import quixotic.personnal.smartcardapi.exception.APIException;

import static org.springframework.http.HttpStatus.GONE;

public class GoneRequestException extends APIException {
    public GoneRequestException(String message) {
        super(GONE, message);
    }
}
