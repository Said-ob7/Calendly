package ma.emsi.calendly_backend.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import ma.emsi.calendly_backend.entities.User;
import ma.emsi.calendly_backend.repository.UserRepository;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    @Value("${frontend.url}")
    private String frontendUrl;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {


        if (authentication instanceof OAuth2AuthenticationToken) {
            OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
            OAuth2User oauth2User = oauthToken.getPrincipal();
            String oauthProvider = oauthToken.getAuthorizedClientRegistrationId(); // Example: "google", "facebook", etc.

            // Extract user details
            String name = oauth2User.getAttribute("name");
            String email = oauth2User.getAttribute("email");
            String oauthProviderUserId = oauth2User.getName(); // Unique ID provided by the OAuth provider

            // Check if the user already exists
            User user = userRepository.findByOauthProviderAndOauthProviderUserId(oauthProvider, oauthProviderUserId);
            if (user == null) {
                // If user does not exist, create a new user
                user = new User();
                user.setName(name);
                user.setEmail(email);
                user.setOauthProvider(oauthProvider);
                user.setOauthProviderUserId(oauthProviderUserId);
                userRepository.save(user);
            }
        }
        this.setAlwaysUseDefaultTargetUrl(true);
        this.setDefaultTargetUrl(frontendUrl + "/board");

        super.onAuthenticationSuccess(request, response, authentication);
    }


}
