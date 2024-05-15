package ma.emsi.calendly_backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import ma.emsi.calendly_backend.entities.Events;
import ma.emsi.calendly_backend.entities.User;
import ma.emsi.calendly_backend.repository.EventsRepository;
import ma.emsi.calendly_backend.repository.UserRepository;

@RestController
@RequestMapping("/api/events")
public class EventsController {

    @Autowired
    private EventsRepository eventsRepository;

    @Autowired
    private UserRepository userRepository;

    // Get all events
    // Get all events created by the authenticated user
    @GetMapping
    public ResponseEntity<List<Events>> getAllEvents() {
        // Get the authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User currentUser = userRepository.findByEmail(currentPrincipalName);

        // Retrieve events created by the authenticated user
        List<Events> events = eventsRepository.findByUser(currentUser);

        return new ResponseEntity<>(events, HttpStatus.OK);
    }


    // Create a new event linked to the authenticated user
    @PostMapping
    public ResponseEntity<Events> createEvent(@RequestBody Events event) {

//        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
//        OAuth2User oauth2User = oauthToken.getPrincipal();
//        String email = oauth2User.getAttribute("email");
//        User currentUser = userRepository.findByEmail(email);
        // Get the authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User currentUser = userRepository.findByEmail(currentPrincipalName);

        // Associate the event with the authenticated user
        event.setUser(currentUser);

        // Save the event
        Events createdEvent = eventsRepository.save(event);
        System.out.println("Event Created");

        return new ResponseEntity<>(createdEvent, HttpStatus.CREATED);
    }

    // Get a single event by ID
    @GetMapping("/{id}")
    public ResponseEntity<Events> getEventById(@PathVariable Long id) {
        Events event = eventsRepository.findById(id)
                .orElse(null);
        if (event != null) {
            return new ResponseEntity<>(event, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update an existing event
    @PutMapping("/{id}")
    public ResponseEntity<Events> updateEvent(@PathVariable Long id, @RequestBody Events updatedEvent) {
        if (!eventsRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        updatedEvent.setId(id); // Ensure the ID is set for the update operation
        Events savedEvent = eventsRepository.save(updatedEvent);
        System.out.println("Event Updated");
        return new ResponseEntity<>(savedEvent, HttpStatus.OK);
    }

    // Delete an event
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        if (!eventsRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        eventsRepository.deleteById(id);
        System.out.println("Event Deleted");
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
