//package ma.emsi.calendly_backend.Services;
//
//import ma.emsi.calendly_backend.entities.User;
//import ma.emsi.calendly_backend.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
//@Service
//public class OAuthUserService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    public User createUserFromOAuth(OAuthUserInfo userInfo) {
//        // Check if a user with the same OAuth provider user ID exists
//        Optional<User> existingUser = userRepository.findByOauthProviderAndOauthProviderUserId(userInfo.getProvider(), userInfo.getUserId());
//
//        if (existingUser.isPresent()) {
//            // Update existing user's information
//            User user = existingUser.get();
//            user.setUsername(userInfo.getUsername());
//            user.setEmail(userInfo.getEmail());
//            // Update other user fields as needed
//            return userRepository.save(user);
//        } else {
//            // Create a new user
//            User newUser = new User();
//            newUser.setUsername(userInfo.getUsername());
//            newUser.setEmail(userInfo.getEmail());
//            newUser.setOauthProvider(userInfo.getProvider());
//            newUser.setOauthProviderUserId(userInfo.getUserId());
//            // Set other user fields as needed
//            return userRepository.save(newUser);
//        }
//    }
//}
//
