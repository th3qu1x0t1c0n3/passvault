package quixotic.personnal.passvault.exception.badRequestException;

public class UsernameTakenException extends BadRequestException {
    public UsernameTakenException() {
        super("message.usernameTaken");
    }
}
