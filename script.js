// Station data with line information
const stationLines = {
    // Blue Line
    "Dakshineswar": ["Blue"],
    "Baranagar": ["Blue"],
    "Noapara": ["Blue"],
    "Dum Dum": ["Blue"],
    "Belgachhia": ["Blue"],
    "Shyambazaar": ["Blue"],
    "Shobhabazar Sutanuti": ["Blue"],
    "Girish Park": ["Blue"],
    "Mahatma Gandhi Road": ["Blue"],
    "Central": ["Blue"],
    "Chandni Chowk": ["Blue"],
    "Esplanade": ["Blue", "Green"],
    "Park Street": ["Blue"],
    "Maidan": ["Blue"],
    "Rabindra Sadan": ["Blue"],
    "Netaji Bhavan": ["Blue"],
    "Jatin Das Park": ["Blue"],
    "Kalighat": ["Blue"],
    "Rabindra Sarobar": ["Blue"],
    "Mahanayak Uttam Kumar": ["Blue"],
    "Netaji": ["Blue"],
    "Masterda Surya Sen": ["Blue"],
    "Gitanjali": ["Blue"],
    "Kavi Nazrul": ["Blue"],
    "Shahid Khudiram": ["Blue"],
    "Kavi Subhash": ["Blue", "Orange"],
    
    // Green Line
    "Salt Lake Sector-V": ["Green"],
    "Karunamoyee": ["Green"],
    "Central Park": ["Green"],
    "City Centre": ["Green"],
    "Bengal Chemical": ["Green"],
    "Salt Lake Stadium": ["Green"],
    "Phoolbagan": ["Green"],
    "Sealdah": ["Green"],
    "Mahakaran": ["Green"],
    "Howrah Metro": ["Green"],
    "Howrah Maidan": ["Green"],
    
    // Purple Line
    "Joka": ["Purple"],
    "Thakurpukur": ["Purple"],
    "Sakher Bazar": ["Purple"],
    "Behala Chowrashta": ["Purple"],
    "Behala Bazar": ["Purple"],
    "Taratala": ["Purple"],
    "Majherhat": ["Purple"],
    
    // Orange Line
    "Satyajit Ray": ["Orange"],
    "Jyotirindra Nandi": ["Orange"],
    "Kavi Sukanta": ["Orange"],
    "Hemanta Mukhopadhyay": ["Orange"]
};

// Merged fare data (complete matrix from image)
const fareData = {
    "Howrah Maidan": {"Howrah Maidan":0,"Howrah Metro":5,"Mahakaran":10,"Esplanade":10,"Dakshineswar":30,"Baranagar":30,"Noapara":30,"Dum Dum":25,"Belgachhia":25,"Shyambazaar":25,"Shobhabazar Sutanuti":20,"Girish Park":20,"Mahatma Gandhi Road":20,"Central":15,"Chandni Chowk":15,"Park Street":15,"Maidan":15,"Rabindra Sadan":20,"Netaji Bhavan":20,"Jatin Das Park":20,"Kalighat":25,"Rabindra Sarobar":25,"Mahanayak Uttam Kumar":25,"Netaji":25,"Masterda Surya Sen":30,"Gitanjali":30,"Kavi Nazrul":30,"Shahid Khudiram":30,"Kavi Subhash":30,"Satyajit Ray":35,"Jyotirindra Nandi":40,"Kavi Sukanta":40,"Hemanta Mukhopadhyay":50},
    "Howrah Metro": {"Howrah Maidan":5,"Howrah Metro":0,"Mahakaran":10,"Esplanade":10,"Dakshineswar":30,"Baranagar":30,"Noapara":30,"Dum Dum":25,"Belgachhia":25,"Shyambazaar":25,"Shobhabazar Sutanuti":20,"Girish Park":20,"Mahatma Gandhi Road":20,"Central":15,"Chandni Chowk":15,"Park Street":15,"Maidan":15,"Rabindra Sadan":20,"Netaji Bhavan":20,"Jatin Das Park":20,"Kalighat":25,"Rabindra Sarobar":25,"Mahanayak Uttam Kumar":25,"Netaji":25,"Masterda Surya Sen":30,"Gitanjali":30,"Kavi Nazrul":30,"Shahid Khudiram":30,"Kavi Subhash":30,"Satyajit Ray":35,"Jyotirindra Nandi":40,"Kavi Sukanta":40,"Hemanta Mukhopadhyay":50},
    "Mahakaran": {"Howrah Maidan":10,"Howrah Metro":10,"Mahakaran":0,"Esplanade":5,"Dakshineswar":25,"Baranagar":25,"Noapara":25,"Dum Dum":20,"Belgachhia":20,"Shyambazaar":20,"Shobhabazar Sutanuti":15,"Girish Park":15,"Mahatma Gandhi Road":15,"Central":10,"Chandni Chowk":10,"Park Street":10,"Maidan":10,"Rabindra Sadan":15,"Netaji Bhavan":15,"Jatin Das Park":15,"Kalighat":20,"Rabindra Sarobar":20,"Mahanayak Uttam Kumar":20,"Netaji":20,"Masterda Surya Sen":25,"Gitanjali":25,"Kavi Nazrul":25,"Shahid Khudiram":25,"Kavi Subhash":25,"Satyajit Ray":30,"Jyotirindra Nandi":35,"Kavi Sukanta":35,"Hemanta Mukhopadhyay":45},
    "Esplanade": {"Howrah Maidan":10,"Howrah Metro":10,"Mahakaran":5,"Esplanade":0,"Dakshineswar":20,"Baranagar":20,"Noapara":20,"Dum Dum":15,"Belgachhia":15,"Shyambazaar":15,"Shobhabazar Sutanuti":10,"Girish Park":10,"Mahatma Gandhi Road":10,"Central":5,"Chandni Chowk":5,"Park Street":5,"Maidan":5,"Rabindra Sadan":10,"Netaji Bhavan":10,"Jatin Das Park":10,"Kalighat":15,"Rabindra Sarobar":15,"Mahanayak Uttam Kumar":15,"Netaji":15,"Masterda Surya Sen":20,"Gitanjali":20,"Kavi Nazrul":20,"Shahid Khudiram":20,"Kavi Subhash":20,"Satyajit Ray":25,"Jyotirindra Nandi":30,"Kavi Sukanta":30,"Hemanta Mukhopadhyay":40},
    "Dakshineswar": {"Howrah Maidan":30,"Howrah Metro":30,"Mahakaran":25,"Esplanade":20,"Dakshineswar":0,"Baranagar":5,"Noapara":10,"Dum Dum":15,"Belgachhia":15,"Shyambazaar":20,"Shobhabazar Sutanuti":20,"Girish Park":20,"Mahatma Gandhi Road":20,"Central":20,"Chandni Chowk":20,"Park Street":20,"Maidan":20,"Rabindra Sadan":20,"Netaji Bhavan":20,"Jatin Das Park":20,"Kalighat":25,"Rabindra Sarobar":25,"Mahanayak Uttam Kumar":25,"Netaji":25,"Masterda Surya Sen":25,"Gitanjali":25,"Kavi Nazrul":25,"Shahid Khudiram":25,"Kavi Subhash":25,"Satyajit Ray":30,"Jyotirindra Nandi":35,"Kavi Sukanta":35,"Hemanta Mukhopadhyay":45},
    "Baranagar": {"Howrah Maidan":30,"Howrah Metro":30,"Mahakaran":25,"Esplanade":20,"Dakshineswar":5,"Baranagar":0,"Noapara":10,"Dum Dum":10,"Belgachhia":15,"Shyambazaar":15,"Shobhabazar Sutanuti":15,"Girish Park":20,"Mahatma Gandhi Road":20,"Central":20,"Chandni Chowk":20,"Park Street":20,"Maidan":20,"Rabindra Sadan":20,"Netaji Bhavan":20,"Jatin Das Park":20,"Kalighat":20,"Rabindra Sarobar":20,"Mahanayak Uttam Kumar":25,"Netaji":25,"Masterda Surya Sen":25,"Gitanjali":25,"Kavi Nazrul":25,"Shahid Khudiram":25,"Kavi Subhash":25,"Satyajit Ray":30,"Jyotirindra Nandi":35,"Kavi Sukanta":35,"Hemanta Mukhopadhyay":45},
    "Noapara": {"Howrah Maidan":30,"Howrah Metro":30,"Mahakaran":25,"Esplanade":20,"Dakshineswar":10,"Baranagar":10,"Noapara":0,"Dum Dum":10,"Belgachhia":10,"Shyambazaar":15,"Shobhabazar Sutanuti":15,"Girish Park":15,"Mahatma Gandhi Road":15,"Central":15,"Chandni Chowk":20,"Park Street":20,"Maidan":20,"Rabindra Sadan":20,"Netaji Bhavan":20,"Jatin Das Park":20,"Kalighat":20,"Rabindra Sarobar":20,"Mahanayak Uttam Kumar":20,"Netaji":25,"Masterda Surya Sen":25,"Gitanjali":25,"Kavi Nazrul":25,"Shahid Khudiram":25,"Kavi Subhash":25,"Satyajit Ray":30,"Jyotirindra Nandi":35,"Kavi Sukanta":35,"Hemanta Mukhopadhyay":45},
    "Dum Dum": {"Howrah Maidan":25,"Howrah Metro":25,"Mahakaran":20,"Esplanade":15,"Dakshineswar":15,"Baranagar":10,"Noapara":10,"Dum Dum":0,"Belgachhia":10,"Shyambazaar":10,"Shobhabazar Sutanuti":10,"Girish Park":15,"Mahatma Gandhi Road":15,"Central":15,"Chandni Chowk":15,"Park Street":15,"Maidan":20,"Rabindra Sadan":20,"Netaji Bhavan":20,"Jatin Das Park":20,"Kalighat":20,"Rabindra Sarobar":20,"Mahanayak Uttam Kumar":20,"Netaji":20,"Masterda Surya Sen":20,"Gitanjali":25,"Kavi Nazrul":25,"Shahid Khudiram":25,"Kavi Subhash":25,"Satyajit Ray":30,"Jyotirindra Nandi":35,"Kavi Sukanta":35,"Hemanta Mukhopadhyay":45},
    "Belgachhia": {"Howrah Maidan":25,"Howrah Metro":25,"Mahakaran":20,"Esplanade":15,"Dakshineswar":15,"Baranagar":15,"Noapara":10,"Dum Dum":10,"Belgachhia":0,"Shyambazaar":5,"Shobhabazar Sutanuti":10,"Girish Park":10,"Mahatma Gandhi Road":10,"Central":15,"Chandni Chowk":15,"Park Street":15,"Maidan":15,"Rabindra Sadan":15,"Netaji Bhavan":20,"Jatin Das Park":20,"Kalighat":20,"Rabindra Sarobar":20,"Mahanayak Uttam Kumar":20,"Netaji":20,"Masterda Surya Sen":20,"Gitanjali":20,"Kavi Nazrul":25,"Shahid Khudiram":25,"Kavi Subhash":25,"Satyajit Ray":30,"Jyotirindra Nandi":35,"Kavi Sukanta":35,"Hemanta Mukhopadhyay":45},
    "Shyambazaar": {"Howrah Maidan":25,"Howrah Metro":25,"Mahakaran":20,"Esplanade":15,"Dakshineswar":20,"Baranagar":15,"Noapara":15,"Dum Dum":10,"Belgachhia":5,"Shyambazaar":0,"Shobhabazar Sutanuti":5,"Girish Park":5,"Mahatma Gandhi Road":10,"Central":10,"Chandni Chowk":10,"Park Street":15,"Maidan":15,"Rabindra Sadan":15,"Netaji Bhavan":15,"Jatin Das Park":15,"Kalighat":20,"Rabindra Sarobar":20,"Mahanayak Uttam Kumar":20,"Netaji":20,"Masterda Surya Sen":20,"Gitanjali":20,"Kavi Nazrul":20,"Shahid Khudiram":20,"Kavi Subhash":25,"Satyajit Ray":30,"Jyotirindra Nandi":35,"Kavi Sukanta":35,"Hemanta Mukhopadhyay":45},
    "Shobhabazar Sutanuti": {"Howrah Maidan":20,"Howrah Metro":20,"Mahakaran":15,"Esplanade":10,"Dakshineswar":20,"Baranagar":15,"Noapara":15,"Dum Dum":10,"Belgachhia":10,"Shyambazaar":5,"Shobhabazar Sutanuti":0,"Girish Park":5,"Mahatma Gandhi Road":5,"Central":10,"Chandni Chowk":10,"Park Street":10,"Maidan":15,"Rabindra Sadan":15,"Netaji Bhavan":15,"Jatin Das Park":15,"Kalighat":15,"Rabindra Sarobar":20,"Mahanayak Uttam Kumar":20,"Netaji":20,"Masterda Surya Sen":20,"Gitanjali":20,"Kavi Nazrul":20,"Shahid Khudiram":20,"Kavi Subhash":25,"Satyajit Ray":30,"Jyotirindra Nandi":35,"Kavi Sukanta":35,"Hemanta Mukhopadhyay":45},
    "Girish Park": {"Howrah Maidan":20,"Howrah Metro":20,"Mahakaran":15,"Esplanade":10,"Dakshineswar":20,"Baranagar":20,"Noapara":15,"Dum Dum":15,"Belgachhia":10,"Shyambazaar":5,"Shobhabazar Sutanuti":5,"Girish Park":0,"Mahatma Gandhi Road":5,"Central":5,"Chandni Chowk":10,"Park Street":10,"Maidan":10,"Rabindra Sadan":15,"Netaji Bhavan":15,"Jatin Das Park":15,"Kalighat":15,"Rabindra Sarobar":15,"Mahanayak Uttam Kumar":20,"Netaji":20,"Masterda Surya Sen":20,"Gitanjali":20,"Kavi Nazrul":20,"Shahid Khudiram":20,"Kavi Subhash":20,"Satyajit Ray":25,"Jyotirindra Nandi":30,"Kavi Sukanta":30,"Hemanta Mukhopadhyay":40},
    "Mahatma Gandhi Road": {"Howrah Maidan":20,"Howrah Metro":20,"Mahakaran":15,"Esplanade":10,"Dakshineswar":20,"Baranagar":20,"Noapara":15,"Dum Dum":15,"Belgachhia":10,"Shyambazaar":10,"Shobhabazar Sutanuti":5,"Girish Park":5,"Mahatma Gandhi Road":0,"Central":5,"Chandni Chowk":5,"Park Street":10,"Maidan":10,"Rabindra Sadan":10,"Netaji Bhavan":15,"Jatin Das Park":15,"Kalighat":15,"Rabindra Sarobar":15,"Mahanayak Uttam Kumar":15,"Netaji":20,"Masterda Surya Sen":20,"Gitanjali":20,"Kavi Nazrul":20,"Shahid Khudiram":20,"Kavi Subhash":20,"Satyajit Ray":25,"Jyotirindra Nandi":30,"Kavi Sukanta":30,"Hemanta Mukhopadhyay":40},
    "Central": {"Howrah Maidan":15,"Howrah Metro":15,"Mahakaran":10,"Esplanade":5,"Dakshineswar":20,"Baranagar":20,"Noapara":15,"Dum Dum":15,"Belgachhia":15,"Shyambazaar":10,"Shobhabazar Sutanuti":10,"Girish Park":5,"Mahatma Gandhi Road":5,"Central":0,"Chandni Chowk":5,"Park Street":10,"Maidan":10,"Rabindra Sadan":10,"Netaji Bhavan":10,"Jatin Das Park":15,"Kalighat":15,"Rabindra Sarobar":15,"Mahanayak Uttam Kumar":15,"Netaji":20,"Masterda Surya Sen":20,"Gitanjali":20,"Kavi Nazrul":20,"Shahid Khudiram":20,"Kavi Subhash":20,"Satyajit Ray":25,"Jyotirindra Nandi":30,"Kavi Sukanta":30,"Hemanta Mukhopadhyay":40},
    "Chandni Chowk": {"Howrah Maidan":15,"Howrah Metro":15,"Mahakaran":10,"Esplanade":5,"Dakshineswar":20,"Baranagar":20,"Noapara":20,"Dum Dum":15,"Belgachhia":15,"Shyambazaar":10,"Shobhabazar Sutanuti":10,"Girish Park":10,"Mahatma Gandhi Road":5,"Central":5,"Chandni Chowk":0,"Park Street":5,"Maidan":10,"Rabindra Sadan":10,"Netaji Bhavan":10,"Jatin Das Park":15,"Kalighat":15,"Rabindra Sarobar":15,"Mahanayak Uttam Kumar":15,"Netaji":20,"Masterda Surya Sen":20,"Gitanjali":20,"Kavi Nazrul":20,"Shahid Khudiram":20,"Kavi Subhash":20,"Satyajit Ray":25,"Jyotirindra Nandi":30,"Kavi Sukanta":30,"Hemanta Mukhopadhyay":40},
    "Park Street": {"Howrah Maidan":15,"Howrah Metro":15,"Mahakaran":10,"Esplanade":5,"Dakshineswar":20,"Baranagar":20,"Noapara":20,"Dum Dum":15,"Belgachhia":15,"Shyambazaar":15,"Shobhabazar Sutanuti":10,"Girish Park":10,"Mahatma Gandhi Road":10,"Central":10,"Chandni Chowk":5,"Park Street":0,"Maidan":5,"Rabindra Sadan":5,"Netaji Bhavan":10,"Jatin Das Park":10,"Kalighat":10,"Rabindra Sarobar":15,"Mahanayak Uttam Kumar":15,"Netaji":15,"Masterda Surya Sen":20,"Gitanjali":20,"Kavi Nazrul":20,"Shahid Khudiram":20,"Kavi Subhash":20,"Satyajit Ray":25,"Jyotirindra Nandi":30,"Kavi Sukanta":30,"Hemanta Mukhopadhyay":40},
    "Maidan": {"Howrah Maidan":15,"Howrah Metro":15,"Mahakaran":10,"Esplanade":5,"Dakshineswar":20,"Baranagar":20,"Noapara":20,"Dum Dum":20,"Belgachhia":15,"Shyambazaar":15,"Shobhabazar Sutanuti":15,"Girish Park":10,"Mahatma Gandhi Road":10,"Central":10,"Chandni Chowk":10,"Park Street":5,"Maidan":0,"Rabindra Sadan":5,"Netaji Bhavan":5,"Jatin Das Park":10,"Kalighat":10,"Rabindra Sarobar":10,"Mahanayak Uttam Kumar":15,"Netaji":15,"Masterda Surya Sen":15,"Gitanjali":20,"Kavi Nazrul":20,"Shahid Khudiram":20,"Kavi Subhash":20,"Satyajit Ray":25,"Jyotirindra Nandi":30,"Kavi Sukanta":30,"Hemanta Mukhopadhyay":40},
    "Rabindra Sadan": {"Howrah Maidan":20,"Howrah Metro":20,"Mahakaran":15,"Esplanade":10,"Dakshineswar":20,"Baranagar":20,"Noapara":20,"Dum Dum":20,"Belgachhia":15,"Shyambazaar":15,"Shobhabazar Sutanuti":15,"Girish Park":15,"Mahatma Gandhi Road":10,"Central":10,"Chandni Chowk":10,"Park Street":5,"Maidan":5,"Rabindra Sadan":0,"Netaji Bhavan":5,"Jatin Das Park":5,"Kalighat":10,"Rabindra Sarobar":10,"Mahanayak Uttam Kumar":15,"Netaji":15,"Masterda Surya Sen":15,"Gitanjali":15,"Kavi Nazrul":20,"Shahid Khudiram":20,"Kavi Subhash":20,"Satyajit Ray":25,"Jyotirindra Nandi":30,"Kavi Sukanta":30,"Hemanta Mukhopadhyay":40},
    "Netaji Bhavan": {"Howrah Maidan":20,"Howrah Metro":20,"Mahakaran":15,"Esplanade":10,"Dakshineswar":20,"Baranagar":20,"Noapara":20,"Dum Dum":20,"Belgachhia":20,"Shyambazaar":15,"Shobhabazar Sutanuti":15,"Girish Park":15,"Mahatma Gandhi Road":15,"Central":10,"Chandni Chowk":10,"Park Street":10,"Maidan":5,"Rabindra Sadan":5,"Netaji Bhavan":0,"Jatin Das Park":5,"Kalighat":5,"Rabindra Sarobar":10,"Mahanayak Uttam Kumar":10,"Netaji":15,"Masterda Surya Sen":15,"Gitanjali":15,"Kavi Nazrul":20,"Shahid Khudiram":20,"Kavi Subhash":20,"Satyajit Ray":25,"Jyotirindra Nandi":30,"Kavi Sukanta":30,"Hemanta Mukhopadhyay":40},
    "Jatin Das Park": {"Howrah Maidan":20,"Howrah Metro":20,"Mahakaran":15,"Esplanade":10,"Dakshineswar":20,"Baranagar":20,"Noapara":20,"Dum Dum":20,"Belgachhia":20,"Shyambazaar":15,"Shobhabazar Sutanuti":15,"Girish Park":15,"Mahatma Gandhi Road":15,"Central":15,"Chandni Chowk":15,"Park Street":10,"Maidan":10,"Rabindra Sadan":5,"Netaji Bhavan":5,"Jatin Das Park":0,"Kalighat":5,"Rabindra Sarobar":5,"Mahanayak Uttam Kumar":10,"Netaji":15,"Masterda Surya Sen":15,"Gitanjali":15,"Kavi Nazrul":15,"Shahid Khudiram":20,"Kavi Subhash":20,"Satyajit Ray":25,"Jyotirindra Nandi":30,"Kavi Sukanta":30,"Hemanta Mukhopadhyay":40},
    "Kalighat": {"Howrah Maidan":25,"Howrah Metro":25,"Mahakaran":20,"Esplanade":15,"Dakshineswar":25,"Baranagar":20,"Noapara":20,"Dum Dum":20,"Belgachhia":20,"Shyambazaar":20,"Shobhabazar Sutanuti":15,"Girish Park":15,"Mahatma Gandhi Road":15,"Central":15,"Chandni Chowk":15,"Park Street":10,"Maidan":10,"Rabindra Sadan":10,"Netaji Bhavan":5,"Jatin Das Park":5,"Kalighat":0,"Rabindra Sarobar":5,"Mahanayak Uttam Kumar":10,"Netaji":10,"Masterda Surya Sen":15,"Gitanjali":15,"Kavi Nazrul":15,"Shahid Khudiram":15,"Kavi Subhash":20,"Satyajit Ray":25,"Jyotirindra Nandi":30,"Kavi Sukanta":30,"Hemanta Mukhopadhyay":40},
    "Rabindra Sarobar": {"Howrah Maidan":25,"Howrah Metro":25,"Mahakaran":20,"Esplanade":15,"Dakshineswar":25,"Baranagar":20,"Noapara":20,"Dum Dum":20,"Belgachhia":20,"Shyambazaar":20,"Shobhabazar Sutanuti":20,"Girish Park":15,"Mahatma Gandhi Road":15,"Central":15,"Chandni Chowk":15,"Park Street":15,"Maidan":10,"Rabindra Sadan":10,"Netaji Bhavan":10,"Jatin Das Park":5,"Kalighat":5,"Rabindra Sarobar":0,"Mahanayak Uttam Kumar":5,"Netaji":10,"Masterda Surya Sen":10,"Gitanjali":15,"Kavi Nazrul":15,"Shahid Khudiram":15,"Kavi Subhash":15,"Satyajit Ray":20,"Jyotirindra Nandi":25,"Kavi Sukanta":25,"Hemanta Mukhopadhyay":35},
    "Mahanayak Uttam Kumar": {"Howrah Maidan":25,"Howrah Metro":25,"Mahakaran":20,"Esplanade":15,"Dakshineswar":25,"Baranagar":25,"Noapara":20,"Dum Dum":20,"Belgachhia":20,"Shyambazaar":20,"Shobhabazar Sutanuti":20,"Girish Park":20,"Mahatma Gandhi Road":15,"Central":15,"Chandni Chowk":15,"Park Street":15,"Maidan":15,"Rabindra Sadan":15,"Netaji Bhavan":10,"Jatin Das Park":10,"Kalighat":10,"Rabindra Sarobar":5,"Mahanayak Uttam Kumar":0,"Netaji":5,"Masterda Surya Sen":10,"Gitanjali":10,"Kavi Nazrul":15,"Shahid Khudiram":15,"Kavi Subhash":15,"Satyajit Ray":20,"Jyotirindra Nandi":25,"Kavi Sukanta":25,"Hemanta Mukhopadhyay":35},
    "Netaji": {"Howrah Maidan":25,"Howrah Metro":25,"Mahakaran":20,"Esplanade":15,"Dakshineswar":25,"Baranagar":25,"Noapara":25,"Dum Dum":20,"Belgachhia":20,"Shyambazaar":20,"Shobhabazar Sutanuti":20,"Girish Park":20,"Mahatma Gandhi Road":20,"Central":20,"Chandni Chowk":20,"Park Street":15,"Maidan":15,"Rabindra Sadan":15,"Netaji Bhavan":15,"Jatin Das Park":15,"Kalighat":10,"Rabindra Sarobar":10,"Mahanayak Uttam Kumar":5,"Netaji":0,"Masterda Surya Sen":5,"Gitanjali":10,"Kavi Nazrul":10,"Shahid Khudiram":15,"Kavi Subhash":15,"Satyajit Ray":20,"Jyotirindra Nandi":25,"Kavi Sukanta":25,"Hemanta Mukhopadhyay":35},
    "Masterda Surya Sen": {"Howrah Maidan":30,"Howrah Metro":30,"Mahakaran":25,"Esplanade":20,"Dakshineswar":25,"Baranagar":25,"Noapara":25,"Dum Dum":20,"Belgachhia":20,"Shyambazaar":20,"Shobhabazar Sutanuti":20,"Girish Park":20,"Mahatma Gandhi Road":20,"Central":20,"Chandni Chowk":20,"Park Street":20,"Maidan":15,"Rabindra Sadan":15,"Netaji Bhavan":15,"Jatin Das Park":15,"Kalighat":15,"Rabindra Sarobar":10,"Mahanayak Uttam Kumar":10,"Netaji":5,"Masterda Surya Sen":0,"Gitanjali":5,"Kavi Nazrul":10,"Shahid Khudiram":10,"Kavi Subhash":15,"Satyajit Ray":20,"Jyotirindra Nandi":25,"Kavi Sukanta":25,"Hemanta Mukhopadhyay":35},
    "Gitanjali": {"Howrah Maidan":30,"Howrah Metro":30,"Mahakaran":25,"Esplanade":20,"Dakshineswar":25,"Baranagar":25,"Noapara":25,"Dum Dum":25,"Belgachhia":20,"Shyambazaar":20,"Shobhabazar Sutanuti":20,"Girish Park":20,"Mahatma Gandhi Road":20,"Central":20,"Chandni Chowk":20,"Park Street":20,"Maidan":20,"Rabindra Sadan":15,"Netaji Bhavan":15,"Jatin Das Park":15,"Kalighat":15,"Rabindra Sarobar":15,"Mahanayak Uttam Kumar":10,"Netaji":10,"Masterda Surya Sen":5,"Gitanjali":0,"Kavi Nazrul":5,"Shahid Khudiram":10,"Kavi Subhash":10,"Satyajit Ray":15,"Jyotirindra Nandi":20,"Kavi Sukanta":20,"Hemanta Mukhopadhyay":30},
    "Kavi Nazrul": {"Howrah Maidan":30,"Howrah Metro":30,"Mahakaran":25,"Esplanade":20,"Dakshineswar":25,"Baranagar":25,"Noapara":25,"Dum Dum":25,"Belgachhia":25,"Shyambazaar":20,"Shobhabazar Sutanuti":20,"Girish Park":20,"Mahatma Gandhi Road":20,"Central":20,"Chandni Chowk":20,"Park Street":20,"Maidan":20,"Rabindra Sadan":20,"Netaji Bhavan":20,"Jatin Das Park":15,"Kalighat":15,"Rabindra Sarobar":15,"Mahanayak Uttam Kumar":15,"Netaji":10,"Masterda Surya Sen":10,"Gitanjali":5,"Kavi Nazrul":0,"Shahid Khudiram":5,"Kavi Subhash":10,"Satyajit Ray":15,"Jyotirindra Nandi":20,"Kavi Sukanta":20,"Hemanta Mukhopadhyay":30},
    "Shahid Khudiram": {"Howrah Maidan":30,"Howrah Metro":30,"Mahakaran":25,"Esplanade":20,"Dakshineswar":25,"Baranagar":25,"Noapara":25,"Dum Dum":25,"Belgachhia":25,"Shyambazaar":20,"Shobhabazar Sutanuti":20,"Girish Park":20,"Mahatma Gandhi Road":20,"Central":20,"Chandni Chowk":20,"Park Street":20,"Maidan":20,"Rabindra Sadan":20,"Netaji Bhavan":20,"Jatin Das Park":20,"Kalighat":15,"Rabindra Sarobar":15,"Mahanayak Uttam Kumar":15,"Netaji":15,"Masterda Surya Sen":10,"Gitanjali":10,"Kavi Nazrul":5,"Shahid Khudiram":0,"Kavi Subhash":5,"Satyajit Ray":10,"Jyotirindra Nandi":15,"Kavi Sukanta":15,"Hemanta Mukhopadhyay":25},
    "Kavi Subhash": {"Howrah Maidan":30,"Howrah Metro":30,"Mahakaran":25,"Esplanade":20,"Dakshineswar":25,"Baranagar":25,"Noapara":25,"Dum Dum":25,"Belgachhia":25,"Shyambazaar":25,"Shobhabazar Sutanuti":25,"Girish Park":20,"Mahatma Gandhi Road":20,"Central":20,"Chandni Chowk":20,"Park Street":20,"Maidan":20,"Rabindra Sadan":20,"Netaji Bhavan":20,"Jatin Das Park":20,"Kalighat":20,"Rabindra Sarobar":15,"Mahanayak Uttam Kumar":15,"Netaji":15,"Masterda Surya Sen":15,"Gitanjali":10,"Kavi Nazrul":10,"Shahid Khudiram":5,"Kavi Subhash":0,"Satyajit Ray":5,"Jyotirindra Nandi":10,"Kavi Sukanta":10,"Hemanta Mukhopadhyay":20},
    "Satyajit Ray": {"Howrah Maidan":35,"Howrah Metro":35,"Mahakaran":30,"Esplanade":25,"Dakshineswar":30,"Baranagar":30,"Noapara":30,"Dum Dum":30,"Belgachhia":30,"Shyambazaar":30,"Shobhabazar Sutanuti":30,"Girish Park":25,"Mahatma Gandhi Road":25,"Central":25,"Chandni Chowk":25,"Park Street":25,"Maidan":25,"Rabindra Sadan":25,"Netaji Bhavan":25,"Jatin Das Park":25,"Kalighat":25,"Rabindra Sarobar":20,"Mahanayak Uttam Kumar":20,"Netaji":20,"Masterda Surya Sen":20,"Gitanjali":15,"Kavi Nazrul":15,"Shahid Khudiram":10,"Kavi Subhash":5,"Satyajit Ray":0,"Jyotirindra Nandi":5,"Kavi Sukanta":10,"Hemanta Mukhopadhyay":10},
    "Jyotirindra Nandi": {"Howrah Maidan":40,"Howrah Metro":40,"Mahakaran":35,"Esplanade":30,"Dakshineswar":35,"Baranagar":35,"Noapara":35,"Dum Dum":35,"Belgachhia":35,"Shyambazaar":35,"Shobhabazar Sutanuti":35,"Girish Park":30,"Mahatma Gandhi Road":30,"Central":30,"Chandni Chowk":30,"Park Street":30,"Maidan":30,"Rabindra Sadan":30,"Netaji Bhavan":30,"Jatin Das Park":30,"Kalighat":30,"Rabindra Sarobar":25,"Mahanayak Uttam Kumar":25,"Netaji":25,"Masterda Surya Sen":25,"Gitanjali":20,"Kavi Nazrul":20,"Shahid Khudiram":15,"Kavi Subhash":10,"Satyajit Ray":5,"Jyotirindra Nandi":0,"Kavi Sukanta":5,"Hemanta Mukhopadhyay":10},
    "Kavi Sukanta": {"Howrah Maidan":40,"Howrah Metro":40,"Mahakaran":35,"Esplanade":30,"Dakshineswar":35,"Baranagar":35,"Noapara":35,"Dum Dum":35,"Belgachhia":35,"Shyambazaar":35,"Shobhabazar Sutanuti":35,"Girish Park":30,"Mahatma Gandhi Road":30,"Central":30,"Chandni Chowk":30,"Park Street":30,"Maidan":30,"Rabindra Sadan":30,"Netaji Bhavan":30,"Jatin Das Park":30,"Kalighat":30,"Rabindra Sarobar":25,"Mahanayak Uttam Kumar":25,"Netaji":25,"Masterda Surya Sen":25,"Gitanjali":20,"Kavi Nazrul":20,"Shahid Khudiram":15,"Kavi Subhash":10,"Satyajit Ray":10,"Jyotirindra Nandi":5,"Kavi Sukanta":0,"Hemanta Mukhopadhyay":5},
    "Hemanta Mukhopadhyay": {"Howrah Maidan":50,"Howrah Metro":50,"Mahakaran":45,"Esplanade":40,"Dakshineswar":45,"Baranagar":45,"Noapara":45,"Dum Dum":45,"Belgachhia":45,"Shyambazaar":45,"Shobhabazar Sutanuti":45,"Girish Park":40,"Mahatma Gandhi Road":40,"Central":40,"Chandni Chowk":40,"Park Street":40,"Maidan":40,"Rabindra Sadan":40,"Netaji Bhavan":40,"Jatin Das Park":40,"Kalighat":40,"Rabindra Sarobar":35,"Mahanayak Uttam Kumar":35,"Netaji":35,"Masterda Surya Sen":35,"Gitanjali":30,"Kavi Nazrul":30,"Shahid Khudiram":25,"Kavi Subhash":20,"Satyajit Ray":10,"Jyotirindra Nandi":10,"Kavi Sukanta":5,"Hemanta Mukhopadhyay":0},
    
    // Green Line exclusive stations
    "Salt Lake Sector-V": {"Salt Lake Sector-V":0,"Karunamoyee":5,"Central Park":10,"City Centre":10,"Bengal Chemical":10,"Salt Lake Stadium":10,"Phoolbagan":20,"Sealdah":20,"Esplanade":30,"Mahakaran":30,"Howrah Metro":30,"Howrah Maidan":30},
    "Karunamoyee": {"Salt Lake Sector-V":5,"Karunamoyee":0,"Central Park":5,"City Centre":5,"Bengal Chemical":10,"Salt Lake Stadium":10,"Phoolbagan":20,"Sealdah":20,"Esplanade":30,"Mahakaran":30,"Howrah Metro":30,"Howrah Maidan":30},
    "Central Park": {"Salt Lake Sector-V":10,"Karunamoyee":5,"Central Park":0,"City Centre":5,"Bengal Chemical":10,"Salt Lake Stadium":10,"Phoolbagan":10,"Sealdah":20,"Esplanade":20,"Mahakaran":30,"Howrah Metro":30,"Howrah Maidan":30},
    "City Centre": {"Salt Lake Sector-V":10,"Karunamoyee":5,"Central Park":5,"City Centre":0,"Bengal Chemical":5,"Salt Lake Stadium":5,"Phoolbagan":10,"Sealdah":20,"Esplanade":20,"Mahakaran":20,"Howrah Metro":30,"Howrah Maidan":30},
    "Bengal Chemical": {"Salt Lake Sector-V":10,"Karunamoyee":10,"Central Park":10,"City Centre":5,"Bengal Chemical":0,"Salt Lake Stadium":5,"Phoolbagan":10,"Sealdah":10,"Esplanade":20,"Mahakaran":20,"Howrah Metro":30,"Howrah Maidan":30},
    "Salt Lake Stadium": {"Salt Lake Sector-V":10,"Karunamoyee":10,"Central Park":10,"City Centre":5,"Bengal Chemical":5,"Salt Lake Stadium":0,"Phoolbagan":5,"Sealdah":10,"Esplanade":20,"Mahakaran":20,"Howrah Metro":20,"Howrah Maidan":30},
    "Phoolbagan": {"Salt Lake Sector-V":20,"Karunamoyee":20,"Central Park":10,"City Centre":10,"Bengal Chemical":10,"Salt Lake Stadium":5,"Phoolbagan":0,"Sealdah":10,"Esplanade":10,"Mahakaran":20,"Howrah Metro":20,"Howrah Maidan":20},
    "Sealdah": {"Salt Lake Sector-V":20,"Karunamoyee":20,"Central Park":20,"City Centre":20,"Bengal Chemical":10,"Salt Lake Stadium":10,"Phoolbagan":10,"Sealdah":0,"Esplanade":10,"Mahakaran":10,"Howrah Metro":20,"Howrah Maidan":20},
    
    // Purple Line exclusive stations
    "Joka": {"Joka":0,"Thakurpukur":5,"Sakher Bazar":10,"Behala Chowrashta":10,"Behala Bazar":20,"Taratala":20,"Majherhat":20},
    "Thakurpukur": {"Joka":5,"Thakurpukur":0,"Sakher Bazar":5,"Behala Chowrashta":10,"Behala Bazar":10,"Taratala":20,"Majherhat":20},
    "Sakher Bazar": {"Joka":10,"Thakurpukur":5,"Sakher Bazar":0,"Behala Chowrashta":5,"Behala Bazar":10,"Taratala":10,"Majherhat":20},
    "Behala Chowrashta": {"Joka":10,"Thakurpukur":10,"Sakher Bazar":5,"Behala Chowrashta":0,"Behala Bazar":5,"Taratala":10,"Majherhat":10},
    "Behala Bazar": {"Joka":20,"Thakurpukur":10,"Sakher Bazar":10,"Behala Chowrashta":5,"Behala Bazar":0,"Taratala":5,"Majherhat":10},
    "Taratala": {"Joka":20,"Thakurpukur":20,"Sakher Bazar":10,"Behala Chowrashta":10,"Behala Bazar":5,"Taratala":0,"Majherhat":5},
    "Majherhat": {"Joka":20,"Thakurpukur":20,"Sakher Bazar":20,"Behala Chowrashta":10,"Behala Bazar":10,"Taratala":5,"Majherhat":0}
};

// List of all stations
const stations = Object.keys(stationLines).sort();

// Language support
let currentLang = 'en';
const translations = {
    en: {
        from: "From Station",
        to: "To Station",
        calculate: "Calculate Fare",
        selectFrom: "Select starting station",
        selectTo: "Select destination station",
        metroLines: "Metro Lines",
        route: "Route Details",
        fare: "Fare",
        stations: "Stations",
        time: "Estimated Time",
        transfer: "Transfer Required at",
        noTransfer: "Direct Route (No Transfer)",
        minutes: "minutes"
    },
    bn: {
        from: "যাত্রা শুরুর স্টেশন",
        to: "গন্তব্য স্টেশন",
        calculate: "ভাড়া হিসাব করুন",
        selectFrom: "শুরুর স্টেশন নির্বাচন করুন",
        selectTo: "গন্তব্য স্টেশন নির্বাচন করুন",
        metroLines: "মেট্রো লাইনসমূহ",
        route: "রুট বিবরণ",
        fare: "ভাড়া",
        stations: "স্টেশন",
        time: "আনুমানিক সময়",
        transfer: "স্থানান্তর প্রয়োজন",
        noTransfer: "সরাসরি রুট (কোনো স্থানান্তর নেই)",
        minutes: "মিনিট"
    }
};

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'bn' : 'en';
    document.getElementById('langText').textContent = currentLang === 'en' ? 'বাংলা' : 'English';
    
    // Update all translatable elements
    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = el.getAttribute('data-' + currentLang);
    });
}

// Display line badges for a station
function displayStationLines(station, elementId) {
    const element = document.getElementById(elementId);
    if (!station || !stationLines[station]) {
        element.innerHTML = '';
        return;
    }
    
    const lines = stationLines[station];
    const lineColors = {
        'Blue': 'blue-line',
        'Green': 'green-line',
        'Purple': 'purple-line',
        'Orange': 'orange-line'
    };
    
    element.innerHTML = lines.map(line => 
        `<span class="line-badge ${lineColors[line]}">${line} Line</span>`
    ).join('');
}

// Autocomplete function
function autocomplete(input, arr, dropdownIcon) {
    let currentFocus;
    
    input.addEventListener("input", function(e) {
        const val = this.value.toLowerCase();
        closeAllLists();
        if (!val) {
            displayStationLines('', input.id + 'Info');
            return false;
        }
        currentFocus = -1;
        const div = document.createElement("div");
        div.setAttribute("id", this.id + "autocomplete-list");
        div.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(div);
        
        let matchCount = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].toLowerCase().includes(val)) {
                const item = document.createElement("div");
                item.innerHTML = arr[i].replace(new RegExp(val, "gi"), match => `<strong>${match}</strong>`);
                item.addEventListener("click", function() {
                    input.value = this.innerText;
                    displayStationLines(this.innerText, input.id + 'Info');
                    closeAllLists();
                });
                div.appendChild(item);
                matchCount++;
                if (matchCount >= 10) break; // Limit results
            }
        }
    });

    dropdownIcon.addEventListener("click", function(e) {
        const listId = input.id + "autocomplete-list";
        const existingList = document.getElementById(listId);

        if (existingList) {
            closeAllLists();
        } else {
            const div = document.createElement("div");
            div.setAttribute("id", listId);
            div.setAttribute("class", "autocomplete-items");
            input.parentNode.appendChild(div);
            for (let i = 0; i < arr.length; i++) {
                const item = document.createElement("div");
                item.innerHTML = arr[i];
                item.addEventListener("click", function() {
                    input.value = this.innerText;
                    displayStationLines(this.innerText, input.id + 'Info');
                    closeAllLists();
                });
                div.appendChild(item);
            }
        }
        e.stopPropagation();
    });

    input.addEventListener("keydown", function(e) {
        let x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = x.length - 1;
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        const items = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < items.length; i++) {
            if (elmnt != items[i] && elmnt != input && elmnt != dropdownIcon) {
                items[i].parentNode.removeChild(items[i]);
            }
        }
    }

    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}

// Find common lines between two stations
function findCommonLines(station1, station2) {
    const lines1 = stationLines[station1] || [];
    const lines2 = stationLines[station2] || [];
    return lines1.filter(line => lines2.includes(line));
}

// Calculate estimated travel time (2.5 minutes per station average)
function calculateTravelTime(fare) {
    const baseTime = 5; // minimum 5 minutes
    const timePerFareUnit = 0.5; // 0.5 minute per ₹5
    return Math.ceil(baseTime + (fare / 5) * timePerFareUnit);
}

// Calculate fare and display route
function calculateFare() {
    const fromStation = document.getElementById("fromStation").value;
    const toStation = document.getElementById("toStation").value;
    const result = document.getElementById("result");
    const routeDetails = document.getElementById("routeDetails");

    result.style.display = "none";
    result.className = "fare-result text-center p-3 mt-3";
    routeDetails.style.display = "none";
    routeDetails.className = "route-details mt-4";

    if (!fromStation || !toStation) {
        result.textContent = "Please select both stations!";
        result.classList.add("error");
        result.style.display = "block";
        return;
    }

    if (fromStation === toStation) {
        result.textContent = "Please select different stations!";
        result.classList.add("error");
        result.style.display = "block";
        return;
    }

    if (fareData[fromStation] && fareData[fromStation][toStation] !== undefined) {
        const fare = fareData[fromStation][toStation];
        const travelTime = calculateTravelTime(fare);
        const commonLines = findCommonLines(fromStation, toStation);
        
        // Display fare result
        result.innerHTML = `<span class="fare-amount">₹${fare}</span><br>from <span class="station-name">${fromStation}</span> to <span class="station-name">${toStation}</span>`;
        result.classList.add("success");
        result.style.display = "block";

        // Display route details
        let routeHTML = `
            <div class="route-header">
                <div class="route-title">${translations[currentLang].route}</div>
            </div>
            <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                <div class="route-info-item">
                    <strong>${translations[currentLang].fare}:</strong> ₹${fare}
                </div>
                <div class="route-info-item">
                    <strong>${translations[currentLang].time}:</strong> ~${travelTime} ${translations[currentLang].minutes}
                </div>
            </div>
        `;

        if (commonLines.length > 0) {
            routeHTML += `
                <div class="transfer-note" style="background: #2d4a3e; border-left-color: #16a34a;">
                    ✓ ${translations[currentLang].noTransfer}<br>
                    <span style="font-size: 0.85rem;">Travel via ${commonLines.join(' or ')} Line</span>
                </div>
            `;
        } else {
            const fromLines = stationLines[fromStation] || [];
            const toLines = stationLines[toStation] || [];
            
            // Find transfer station (Esplanade or Kavi Subhash)
            let transferStation = '';
            if (fromLines.includes('Green') && toLines.includes('Blue')) {
                transferStation = 'Esplanade';
            } else if (fromLines.includes('Blue') && toLines.includes('Green')) {
                transferStation = 'Esplanade';
            } else if (fromLines.includes('Orange') && toLines.includes('Blue')) {
                transferStation = 'Kavi Subhash';
            } else if (fromLines.includes('Blue') && toLines.includes('Orange')) {
                transferStation = 'Kavi Subhash';
            }
            
            if (transferStation) {
                routeHTML += `
                    <div class="transfer-note">
                        ⚠ ${translations[currentLang].transfer} <strong>${transferStation}</strong>
                    </div>
                `;
            }
        }

        routeDetails.innerHTML = routeHTML;
        routeDetails.classList.add('show');
        routeDetails.style.display = 'block';
    } else {
        result.textContent = "Please select valid station names from the dropdown!";
        result.classList.add("error");
        result.style.display = "block";
    }
}

// Initialize autocomplete
document.addEventListener("DOMContentLoaded", () => {
    const fromInput = document.getElementById("fromStation");
    const toInput = document.getElementById("toStation");
    const fromDropdownIcon = fromInput.parentNode.querySelector(".dropdown-icon");
    const toDropdownIcon = toInput.parentNode.querySelector(".dropdown-icon");

    autocomplete(fromInput, stations, fromDropdownIcon);
    autocomplete(toInput, stations, toDropdownIcon);
});
