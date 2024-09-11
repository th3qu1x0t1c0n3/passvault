package quixotic.personnal.passvault.exception.badRequestException;

public class WrongUserException extends BadRequestException{
    public WrongUserException() {
        super("message.wrongUser");
    }
}
