package ma.emsi.calendly_backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import ma.emsi.calendly_backend.entities.Events;
import ma.emsi.calendly_backend.repository.EventsRepository;

@RestController
@RequestMapping("/api/events")
public class EventsController {

    @Autowired
    private EventsRepository eventsRepository;

    // Get all events
    @GetMapping
    public ResponseEntity<List<Events>> getAllEvents() {
        List<Events> events = eventsRepository.findAll();
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    // Create a new event
    @PostMapping
    public ResponseEntity<Events> createEvent(@RequestBody Events event) {
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
