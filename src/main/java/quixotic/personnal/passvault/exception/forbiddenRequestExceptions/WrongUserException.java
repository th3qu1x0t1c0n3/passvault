package quixotic.personnal.passvault.exception.forbiddenRequestExceptions;

public class WrongUserException extends ForbiddenRequestException {
    public WrongUserException() {
        super("message.wrongUser");
    }
}
