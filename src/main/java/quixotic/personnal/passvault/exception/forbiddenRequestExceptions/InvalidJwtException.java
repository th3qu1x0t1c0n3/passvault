package quixotic.personnal.passvault.exception.forbiddenRequestExceptions;

public class InvalidJwtException extends ForbiddenRequestException {
    public InvalidJwtException(String message) {
        super(message);
    }
}
