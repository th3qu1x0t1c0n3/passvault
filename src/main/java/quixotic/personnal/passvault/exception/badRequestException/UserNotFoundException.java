package quixotic.personnal.passvault.exception.badRequestException;

public class UserNotFoundException extends BadRequestException {
    public UserNotFoundException() {
        super("UserNotFoundException");
    }
}
