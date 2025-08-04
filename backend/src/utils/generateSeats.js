// Utility to generate seat map with class and preference
function generateSeats() {
    // prettier-ignore
    // Define cabin layout: class name and inclusive row range
    const layout = [
        { cls: "first", rows: [1, 3] },         // First class: rows 1–3
        { cls: "business", rows: [4, 7] },      // Business class: rows 4–7
        { cls: "premium", rows: [8, 15] },      // Premium economy: rows 8–15
        { cls: "economy", rows: [16, 50] },     // Economy class: rows 16–50
    ];

    // Define seat letter preferences
    const prefs = {
        A: "window",
        B: "aisle",
        C: "middle",
        D: "aisle",
        E: "window",
    };

    // Prepare result array
    const seats = [];

    // Loop through each class block using simple for loops
    for (let i = 0; i < layout.length; i++) {
        const cls = layout[i].cls;
        const start = layout[i].rows[0];
        const end = layout[i].rows[1];

        // Loop through each row number in this block using simple for loop
        for (let r = start; r <= end; r++) {
            // Collect seat letters
            const letters = Object.keys(prefs);

            // Loop through each seat letter using simple for loop
            for (let j = 0; j < letters.length; j++) {
                const letter = letters[j];
                const pref = prefs[letter];

                // prettier-ignore
                // Construct seat object
                const seat = {
                    seatNumber: `${r}${letter}`,    // e.g. "12C"
                    seatClass: cls,                 // e.g. "business"
                    seatPreference: pref,           // e.g. "window"/"aisle"/"middle"
                };

                // Add to seats array
                seats.push(seat);
            }
        }
    }

    // Return fully populated seat map
    return seats;
}

export default generateSeats;
