// Station data with line information
const stationLines = {
    // Blue Line
    "Dakshineswar": ["Blue"],
    "Baranagar": ["Blue"],
    "Noapara": ["Blue", "Yellow"],
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
    "New Garia": ["Blue"],
    
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
    "Hemanta Mukhopadhyay": ["Orange"],
    
    // Yellow Line (Airport)
    "Dum Dum Cantonment": ["Yellow"],
    "Jessore Road": ["Yellow"],
    "Jai Hind": ["Yellow"]
};

// Define line order for each line
const lineStationOrder = {
    "Blue": ["Dakshineswar", "Baranagar", "Noapara", "Dum Dum", "Belgachhia", "Shyambazaar", 
             "Shobhabazar Sutanuti", "Girish Park", "Mahatma Gandhi Road", "Central", "Chandni Chowk", 
             "Esplanade", "Park Street", "Maidan", "Rabindra Sadan", "Netaji Bhavan", "Jatin Das Park", 
             "Kalighat", "Rabindra Sarobar", "Mahanayak Uttam Kumar", "Netaji", "Masterda Surya Sen", 
             "Gitanjali", "Kavi Nazrul", "Shahid Khudiram", "Kavi Subhash", "New Garia"],
    
    "Green": ["Salt Lake Sector-V", "Karunamoyee", "Central Park", "City Centre", "Bengal Chemical", 
              "Salt Lake Stadium", "Phoolbagan", "Sealdah", "Mahakaran", "Esplanade", "Howrah Metro", 
              "Howrah Maidan"],
    
    "Purple": ["Joka", "Thakurpukur", "Sakher Bazar", "Behala Chowrashta", "Behala Bazar", 
               "Taratala", "Majherhat"],
    
    "Orange": ["Kavi Subhash", "Satyajit Ray", "Jyotirindra Nandi", "Kavi Sukanta", 
               "Hemanta Mukhopadhyay"],
    
    "Yellow": ["Noapara", "Dum Dum Cantonment", "Jessore Road", "Jai Hind"]
};

// Transfer connections with types
const transferPoints = {
    "Noapara": { connects: ["Blue", "Yellow"], type: "direct" },
    "Esplanade": { connects: ["Blue", "Green"], type: "direct" },
    "Kavi Subhash": { connects: ["Blue", "Orange"], type: "direct" }
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
        route: "Route Breakdown",
        fare: "Fare",
        stations: "Stations",
        time: "Estimated Time",
        transfer: "Transfer at",
        changeAt: "Change at",
        noTransfer: "Direct Route (No Transfer)",
        minutes: "minutes",
        totalFare: "Total Fare",
        segment: "Segment",
        platform: "Platform",
        timeBetweenTrains: "Time between trains"
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
        transfer: "স্থানান্তর",
        changeAt: "পরিবর্তন",
        noTransfer: "সরাসরি রুট",
        minutes: "মিনিট",
        totalFare: "মোট ভাড়া",
        segment: "অংশ",
        platform: "প্ল্যাটফর্ম",
        timeBetweenTrains: "ট্রেনের মধ্যে সময়"
    }
};

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'bn' : 'en';
    document.getElementById('langText').textContent = currentLang === 'en' ? 'বাংলা' : 'English';
    
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
        'Orange': 'orange-line',
        'Yellow': 'yellow-line'
    };
    
    element.innerHTML = lines.map(line => 
        `<span class="line-badge ${lineColors[line]}">${line} Line</span>`
    ).join('');
}

// Find common lines between two stations
function findCommonLines(station1, station2) {
    const lines1 = stationLines[station1] || [];
    const lines2 = stationLines[station2] || [];
    return lines1.filter(line => lines2.includes(line));
}

// Get stations between two points on a line
function getStationsBetween(line, start, end) {
    const lineStations = lineStationOrder[line];
    if (!lineStations) return [];
    
    const startIdx = lineStations.indexOf(start);
    const endIdx = lineStations.indexOf(end);
    
    if (startIdx === -1 || endIdx === -1) return [];
    
    if (startIdx < endIdx) {
        return lineStations.slice(startIdx, endIdx + 1);
    } else {
        return lineStations.slice(endIdx, startIdx + 1).reverse();
    }
}

// Calculate number of stations between two points
function getStationCount(line, start, end) {
    const stations = getStationsBetween(line, start, end);
    return stations.length > 0 ? stations.length - 1 : 0;
}

// Find best transfer route
function findBestRoute(fromStation, toStation) {
    const fromLines = stationLines[fromStation] || [];
    const toLines = stationLines[toStation] || [];
    
    // Check for direct connection (same line)
    const commonLines = fromLines.filter(line => toLines.includes(line));
    if (commonLines.length > 0) {
        const line = commonLines[0];
        return {
            isDirect: true,
            segments: [{
                line: line,
                from: fromStation,
                to: toStation,
                stations: getStationsBetween(line, fromStation, toStation),
                stationCount: getStationCount(line, fromStation, toStation)
            }]
        };
    }
    
    // Find transfer route
    for (let fromLine of fromLines) {
        for (let toLine of toLines) {
            // Check all transfer points
            for (let transferStation in transferPoints) {
                const transfer = transferPoints[transferStation];
                if (transfer.connects.includes(fromLine) && transfer.connects.includes(toLine)) {
                    return {
                        isDirect: false,
                        transferStation: transferStation,
                        transferType: transfer.type,
                        segments: [
                            {
                                line: fromLine,
                                from: fromStation,
                                to: transferStation,
                                stations: getStationsBetween(fromLine, fromStation, transferStation),
                                stationCount: getStationCount(fromLine, fromStation, transferStation)
                            },
                            {
                                line: toLine,
                                from: transferStation,
                                to: toStation,
                                stations: getStationsBetween(toLine, transferStation, toStation),
                                stationCount: getStationCount(toLine, transferStation, toStation)
                            }
                        ]
                    };
                }
            }
        }
    }
    
    return null;
}

// Calculate estimated travel time (2 minutes per station + 8 minutes transfer time if applicable)
function calculateTravelTime(route) {
    if (!route) return 0;
    
    let totalTime = 0;
    route.segments.forEach(segment => {
        totalTime += segment.stationCount * 2; // 2 minutes per station
    });
    
    if (!route.isDirect) {
        totalTime += 8; // 8 minutes for transfer
    }
    
    return totalTime;
}

// Get line color class
function getLineColorClass(line) {
    const colors = {
        'Blue': 'blue-line',
        'Green': 'green-line',
        'Purple': 'purple-line',
        'Orange': 'orange-line',
        'Yellow': 'yellow-line'
    };
    return colors[line] || '';
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
                if (matchCount >= 10) break;
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

// Create journey visualization similar to the screenshot
function createJourneyVisualization(route) {
    if (!route || !route.segments || route.segments.length === 0) return '';
    
    let html = '<div class="journey-container">';
    
    route.segments.forEach((segment, index) => {
        const lineColorClass = getLineColorClass(segment.line);
        const isLastSegment = index === route.segments.length - 1;
        
        // Starting station
        html += `
            <div class="journey-segment">
                <div class="journey-station">
                    <div class="station-time">${index === 0 ? getCurrentTime() : getEstimatedTime(segment, true)}</div>
                    <div class="line-indicator ${lineColorClass}">${segment.line}</div>
                    <div class="station-info">
                        <div class="station-name">${segment.from}</div>
                        ${index === 0 ? `<div class="platform-info">PF ${getPlatformNumber(segment.from, segment.line)}</div>` : ''}
                    </div>
                </div>
        `;
        
        // Journey line with arrow
        html += `
                <div class="journey-line-wrapper">
                    <div class="journey-line ${lineColorClass}"></div>
                    <div class="journey-arrow">→</div>
                </div>
        `;
        
        // Ending station / Transfer station
        html += `
                <div class="journey-station">
                    <div class="station-time">${getEstimatedTime(segment, false)}</div>
                    <div class="line-indicator ${lineColorClass}">${isLastSegment ? segment.line : 'Transfer'}</div>
                    <div class="station-info">
                        <div class="station-name">${segment.to}</div>
                        <div class="platform-info">PF ${getPlatformNumber(segment.to, segment.line)}${isLastSegment ? '' : getNextPlatform(segment.to)}</div>
                    </div>
                </div>
            </div>
        `;
        
        // Transfer information
        if (!isLastSegment) {
            const nextSegment = route.segments[index + 1];
            const transferTime = 8; // minutes
            html += `
                <div class="transfer-info">
                    <div class="transfer-badge">
                        <span class="transfer-icon">🔄</span>
                        CHANGE PLATFORM
                    </div>
                    <div class="transfer-time">Time between trains: ${transferTime} min</div>
                </div>
            `;
        }
    });
    
    html += '</div>';
    return html;
}

// Helper function to get current time
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

// Helper function to estimate arrival time
function getEstimatedTime(segment, isStart) {
    const now = new Date();
    const travelMinutes = isStart ? 0 : segment.stationCount * 2;
    now.setMinutes(now.getMinutes() + travelMinutes);
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

// Helper function to get platform number (simplified)
function getPlatformNumber(station, line) {
    // This is a simplified version - you can customize based on actual platform data
    const platforms = {
        'Blue': ['1', '2'],
        'Green': ['PF 2', '2B'],
        'Purple': ['1', '2'],
        'Orange': ['1', '2'],
        'Yellow': ['1', '2']
    };
    
    // Determine platform based on line and station
    if (transferPoints[station]) {
        const transfer = transferPoints[station];
        const lineIndex = transfer.connects.indexOf(line);
        return lineIndex === 0 ? '1' : '2';
    }
    
    return '1';
}

// Helper function to get next platform after transfer
function getNextPlatform(station) {
    if (transferPoints[station]) {
        return ' → PF 2B';
    }
    return '';
}

// Format trip duration
function formatDuration(minutes) {
    if (minutes < 60) {
        return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hr ${mins} min`;
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

    // Find the best route
    const route = findBestRoute(fromStation, toStation);
    
    if (!route) {
        result.textContent = "Route not available. Please check station names!";
        result.classList.add("error");
        result.style.display = "block";
        return;
    }

    // Calculate total fare
    let totalFare = 0;
    if (fareData[fromStation] && fareData[fromStation][toStation] !== undefined) {
        totalFare = fareData[fromStation][toStation];
    } else {
        // Calculate fare for each segment
        route.segments.forEach(segment => {
            if (fareData[segment.from] && fareData[segment.from][segment.to] !== undefined) {
                totalFare += fareData[segment.from][segment.to];
            }
        });
    }

    const travelTime = calculateTravelTime(route);
    
    // Display fare result
    result.innerHTML = `
        <div class="fare-display">
            <span class="fare-amount">₹${totalFare}</span>
            <div class="fare-route">
                <span class="station-name">${fromStation}</span> 
                <span class="arrow">→</span> 
                <span class="station-name">${toStation}</span>
            </div>
        </div>
    `;
    result.classList.add("success");
    result.style.display = "block";

    // Build route details HTML
    let routeHTML = `
        <div class="route-header">
            <div class="route-title">${fromStation} → ${toStation}</div>
            <div class="trip-duration">Trip duration: ${formatDuration(travelTime)}</div>
        </div>
    `;

    // Add journey visualization
    routeHTML += createJourneyVisualization(route);

    // Add fare breakdown if there's a transfer
    if (!route.isDirect) {
        routeHTML += `
            <div class="fare-breakdown">
                <div class="breakdown-title">Fare Breakdown</div>
        `;
        
        route.segments.forEach((segment, index) => {
            const segmentFare = fareData[segment.from] && fareData[segment.from][segment.to] 
                ? fareData[segment.from][segment.to] 
                : 0;
            const lineColorClass = getLineColorClass(segment.line);
            
            routeHTML += `
                <div class="breakdown-item">
                    <div class="breakdown-route">
                        <span class="line-badge ${lineColorClass}">${segment.line}</span>
                        <span>${segment.from} → ${segment.to}</span>
                        <span class="station-count">(${segment.stationCount} stations)</span>
                    </div>
                    <div class="breakdown-fare">₹${segmentFare}</div>
                </div>
            `;
        });
        
        routeHTML += `
                <div class="breakdown-total">
                    <span>Total Fare</span>
                    <span>₹${totalFare}</span>
                </div>
            </div>
        `;
    } else {
        // Direct route info
        const segment = route.segments[0];
        const lineColorClass = getLineColorClass(segment.line);
        routeHTML += `
            <div class="direct-route-info">
                <div class="direct-badge">
                    <span>✓</span> Direct Route (No Transfer)
                </div>
                <div class="direct-details">
                    <span class="line-badge ${lineColorClass}">${segment.line} Line</span>
                    <span>${segment.stationCount} stations</span>
                    <span>~${travelTime} minutes</span>
                </div>
            </div>
        `;
    }

    routeDetails.innerHTML = routeHTML;
    routeDetails.classList.add('show');
    routeDetails.style.display = 'block';
}

// Initialize autocomplete on page load
document.addEventListener("DOMContentLoaded", () => {
    const fromInput = document.getElementById("fromStation");
    const toInput = document.getElementById("toStation");
    const fromDropdownIcon = fromInput.parentNode.querySelector(".dropdown-icon");
    const toDropdownIcon = toInput.parentNode.querySelector(".dropdown-icon");

    autocomplete(fromInput, stations, fromDropdownIcon);
    autocomplete(toInput, stations, toDropdownIcon);
    
    // Add Enter key support for calculate button
    const calculateBtn = document.querySelector('button[onclick="calculateFare()"]');
    [fromInput, toInput].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                calculateFare();
            }
        });
    });
});

// Complete merged fare data
const fareData = {
    "Howrah Maidan": {"Howrah Maidan":0,"Howrah Metro":5,"Mahakaran":10,"Esplanade":10,"Dakshineswar":30,"Baranagar":30,"Noapara":30,"Dum Dum":25,"Belgachhia":25,"Shyambazaar":25,"Shobhabazar Sutanuti":20,"Girish Park":20,"Mahatma Gandhi Road":20,"Central":15,"Chandni Chowk":15,"Park Street":15,"Maidan":15,"Rabindra Sadan":20,"Netaji Bhavan":20,"Jatin Das Park":20,"Kalighat":25,"Rabindra Sarobar":25,"Mahanayak Uttam Kumar":25,"Netaji":25,"Masterda Surya Sen":30,"Gitanjali":30,"Kavi Nazrul":30,"Shahid Khudiram":30,"Kavi Subhash":30,"New Garia":30,"Satyajit Ray":35,"Jyotirindra Nandi":40,"Kavi Sukanta":40,"Hemanta Mukhopadhyay":50,"Salt Lake Sector-V":30,"Karunamoyee":30,"Central Park":25,"City Centre":20,"Bengal Chemical":20,"Salt Lake Stadium":20,"Phoolbagan":15,"Sealdah":15},
    "Howrah Metro": {"Howrah Maidan":5,"Howrah Metro":0,"Mahakaran":10,"Esplanade":10,"Dakshineswar":30,"Baranagar":30,"Noapara":30,"Dum Dum":25,"Belgachhia":25,"Shyambazaar":25,"Shobhabazar Sutanuti":20,"Girish Park":20,"Mahatma Gandhi Road":20,"Central":15,"Chandni Chowk":15,"Park Street":15,"Maidan":15,"Rabindra Sadan":20,"Netaji Bhavan":20,"Jatin Das Park":20,"Kalighat":25,"Rabindra Sarobar":25,"Mahanayak Uttam Kumar":25,"Netaji":25,"Masterda Surya Sen":30,"Gitanjali":30,"Kavi Nazrul":30,"Shahid Khudiram":30,"Kavi Subhash":30,"New Garia":30,"Satyajit Ray":35,"Jyotirindra Nandi":40,"Kavi Sukanta":40,"Hemanta Mukhopadhyay":50,"Salt Lake Sector-V":30,"Karunamoyee":30,"Central Park":25,"City Centre":20,"Bengal Chemical":20,"Salt Lake Stadium":20,"Phoolbagan":15,"Sealdah":15},
    "Mahakaran": {"Howrah Maidan":10,"Howrah Metro":10,"Mahakaran":0,"Esplanade":5,"Dakshineswar":25,"Baranagar":25,"Noapara":25,"Dum Dum":20,"Belgachhia":20,"Shyambazaar":20,"Shobhabazar Sutanuti":15,"Girish Park":15,"Mahatma Gandhi Road":15,"Central":10,"Chandni Chowk":10,"Park Street":10,"Maidan":10,"Rabindra Sadan":15,"Netaji Bhavan":15,"Jatin Das Park":15,"Kalighat":20,"Rabindra Sarobar":20,"Mahanayak Uttam Kumar":20,"Netaji":20,"Masterda Surya Sen":25,"Gitanjali":25,"Kavi Nazrul":25,"Shahid Khudiram":25,"Kavi Subhash":25,"New Garia":25,"Satyajit Ray":30,"Jyotirindra Nandi":35,"Kavi Sukanta":35,"Hemanta Mukhopadhyay":45,"Salt Lake Sector-V":25,"Karunamoyee":25,"Central Park":20,"City Centre":15,"Bengal Chemical":15,"Salt Lake Stadium":15,"Phoolbagan":10,"Sealdah":10},
    "Esplanade": {"Howrah Maidan":10,"Howrah Metro":10,"Mahakaran":5,"Esplanade":0,"Dakshineswar":20,"Baranagar":20,"Noapara":20,"Dum Dum":15,"Belgachhia":15,"Shyambazaar":15,"Shobhabazar Sutanuti":10,"Girish Park":10,"Mahatma Gandhi Road":10,"Central":5,"Chandni Chowk":5,"Park Street":5,"Maidan":5,"Rabindra Sadan":10,"Netaji Bhavan":10,"Jatin Das Park":10,"Kalighat":15,"Rabindra Sarobar":15,"Mahanayak Uttam Kumar":15,"Netaji":15,"Masterda Surya Sen":20,"Gitanjali":20,"Kavi Nazrul":20,"Shahid Khudiram":20,"Kavi Subhash":20,"New Garia":20,"Satyajit Ray":25,"Jyotirindra Nandi":30,"Kavi Sukanta":30,"Hemanta Mukhopadhyay":40,"Salt Lake Sector-V":20,"Karunamoyee":20,"Central Park":15,"City Centre":10,"Bengal Chemical":10,"Salt Lake Stadium":10,"Phoolbagan":5,"Sealdah":5},
    "Dakshineswar": {"Howrah Maidan":30,"Howrah Metro":30,"Mahakaran":25,"Esplanade":20,"Dakshineswar":0,"Baranagar":5,"Noapara":10,"Dum Dum":15,"Belgachhia":15,"Shyambazaar":20,"Shobhabazar Sutanuti":20,"Girish Park":20,"Mahatma Gandhi Road":20,"Central":20,"Chandni Chowk":20,"Park Street":20,"Maidan":20,"Rabindra Sadan":20,"Netaji Bhavan":20,"Jatin Das Park":20,"Kalighat":25,"Rabindra Sarobar":25,"Mahanayak Uttam Kumar":25,"Netaji":25,"Masterda Surya Sen":25,"Gitanjali":25,"Kavi Nazrul":25,"Shahid Khudiram":25,"Kavi Subhash":25,"New Garia":25,"Satyajit Ray":30,"Jyotirindra Nandi":35,"Kavi Sukanta":35,"Hemanta Mukhopadhyay":45,"Salt Lake Sector-V":40,"Karunamoyee":40,"Central Park":35,"City Centre":30,"Bengal Chemical":30,"Salt Lake Stadium":30,"Phoolbagan":25,"Sealdah":25},
    "Baranagar": {"Howrah Maidan":30,"Howrah Metro":30,"Mahakaran":25,"Esplanade":20,"Dakshineswar":5,"Baranagar":0,"Noapara":10,"Dum Dum":10,"Belgachhia":15,"Shyambazaar":15,"Shobhabazar Sutanuti":15,"Girish Park":20,"Mahatma Gandhi Road":20,"Central":20,"Chandni Chowk":20,"Park Street":20,"Maidan":20,"Rabindra Sadan":20,"Netaji Bhavan":20,"Jatin Das Park":20,"Kalighat":20,"Rabindra Sarobar":20,"Mahanayak Uttam Kumar":25,"Netaji":25,"Masterda Surya Sen":25,"Gitanjali":25,"Kavi Nazrul":25,"Shahid Khudiram":25,"Kavi Subhash":25,"New Garia":25,"Satyajit Ray":30,"Jyotirindra Nandi":35,"Kavi Sukanta":35,"Hemanta Mukhopadhyay":45,"Salt Lake Sector-V":40,"Karunamoyee":40,"Central Park":35,"City Centre":30,"Bengal Chemical":30,"Salt Lake Stadium":30,"Phoolbagan":25,"Sealdah":25},
    "Noapara": {"Howrah Maidan":30,"Howrah Metro":30,"Mahakaran":25,"Esplanade":20,"Dakshineswar":10,"Baranagar":10,"Noapara":0,"Dum Dum":10,"Belgachhia":10,"Shyambazaar":15,"Shobhabazar Sutanuti":15,"Girish Park":15,"Mahatma Gandhi Road":15,"Central":15,"Chandni Chowk":20,"Park Street":20,"Maidan":20,"Rabindra Sadan":20,"Netaji Bhavan":20,"Jatin Das Park":20,"Kalighat":20,"Rabindra Sarobar":20,"Mahanayak Uttam Kumar":20,"Netaji":25,"Masterda Surya Sen":25,"Gitanjali":25,"Kavi Nazrul":25,"Shahid Khudiram":25,"Kavi Subhash":25,"New Garia":25,"Satyajit Ray":30,"Jyotirindra Nandi":35,"Kavi Sukanta":35,"Hemanta Mukhopadhyay":45,"Salt Lake Sector-V":40,"Karunamoyee":40,"Central Park":35,"City Centre":30,"Bengal Chemical":30,"Salt Lake Stadium":30,"Phoolbagan":25,"Sealdah":25,"Dum Dum Cantonment":10,"Jessore Road":20,"Jai Hind":30},
    "Dum Dum": {"Howrah Maidan":25,"Howrah Metro":25,"Mahakaran":20,"Esplanade":15,"Dakshineswar":15,"Baranagar":10,"Noapara":10,"Dum Dum":0,"Belgachhia":10,"Shyambazaar":10,"Shobhabazar Sutanuti":10,"Girish Park":15,"Mahatma Gandhi Road":15,"Central":15,"Chandni Chowk":15,"Park Street":15,"Maidan":20,"Rabindra Sadan":20,"Netaji Bhavan":20,"Jatin Das Park":20,"Kalighat":20,"Rabindra Sarobar":20,"Mahanayak Uttam Kumar":20,"Netaji":20,"Masterda Surya Sen":20,"Gitanjali":25,"Kavi Nazrul":25,"Shahid Khudiram":25,"Kavi Subhash":25,"New Garia":25,"Satyajit Ray":30,"Jyotirindra Nandi":35,"Kavi Sukanta":35,"Hemanta Mukhopadhyay":45,"Salt Lake Sector-V":35,"Karunamoyee":35,"Central Park":30,"City Centre":25,"Bengal Chemical":25,"Salt Lake Stadium":25,"Phoolbagan":20,"Sealdah":20},
    "Belgachhia": {"Howrah Maidan":25,"Howrah Metro":25,"Mahakaran":20,"Esplanade":15,"Dakshineswar":15,"Baranagar":15,"Noapara":10,"Dum Dum":10,"Belgachhia":0,"Shyambazaar":5,"Shobhabazar Sutanuti":10,"Girish Park":10,"Mahatma Gandhi Road":10,"Central":15,"Chandni Chowk":15,"Park Street":15,"Maidan":15,"Rabindra Sadan":15,"Netaji Bhavan":20,"Jatin Das Park":20,"Kalighat":20,"Rabindra Sarobar":20,"Mahanayak Uttam Kumar":20,"Netaji":20,"Masterda Surya Sen":20,"Gitanjali":20,"Kavi Nazrul":25,"Shahid Khudiram":25,"Kavi Subhash":25,"New Garia":25,"Satyajit Ray":30,"Jyotirindra Nandi":35,"Kavi Sukanta":35,"Hemanta Mukhopadhyay":45,"Salt Lake Sector-V":35,"Karunamoyee":35,"Central Park":30,"City Centre":25,"Bengal Chemical":25,"Salt Lake Stadium":25,"Phoolbagan":20,"Sealdah":20},
    "Shyambazaar": {"Howrah Maidan":25,"Howrah Metro":25,"Mahakaran":20,"Esplanade":15,"Dakshineswar":20,"Baranagar":15,"Noapara":15,"Dum Dum":10,"Belgachhia":5,"Shyambazaar":0,"Shobhabazar Sutanuti":5,"Girish Park":5,"Mahatma Gandhi Road":10,"Central":10,"Chandni Chowk":10,"Park Street":15,"Maidan":15,"Rabindra Sadan":15,"Netaji Bhavan":15,"Jatin Das Park":15,"Kalighat":20,"Rabindra Sarobar":20,"Mahanayak Uttam Kumar":20,"Netaji":20,"Masterda Surya Sen":20,"Gitanjali":20,"Kavi Nazrul":20,"Shahid Khudiram":20,"Kavi Subhash":25,"New Garia":25,"Satyajit Ray":30,"Jyotirindra Nandi":35,"Kavi Sukanta":35,"Hemanta Mukhopadhyay":45,"Salt Lake Sector-V":35,"Karunamoyee":35,"Central Park":30,"City Centre":25,"Bengal Chemical":25,"Salt Lake Stadium":25,"Phoolbagan":20,"Sealdah":20},
    "Shobhabazar Sutanuti": {"Howrah Maidan":20,"Howrah Metro":20,"Mahakaran":15,"Esplanade":10,"Dakshineswar":20,"Baranagar":15,"Noapara":15,"Dum Dum":10,"Belgachhia":10,"Shyambazaar":5,"Shobhabazar Sutanuti":0,"Girish Park":5,"Mahatma Gandhi Road":5,"Central":10,"Chandni Chowk":10,"Park Street":10,"Maidan":15,"Rabindra Sadan":15,"Netaji Bhavan":15,"Jatin Das Park":15,"Kalighat":15,"Rabindra Sarobar":20,"Mahanayak Uttam Kumar":20,"Netaji":20,"Masterda Surya Sen":20,"Gitanjali":20,"Kavi Nazrul":20,"Shahid Khudiram":20,"Kavi Subhash":25,"New Garia":25,"Satyajit Ray":30,"Jyotirindra Nandi":35,"Kavi Sukanta":35,"Hemanta Mukhopadhyay":45,"Salt Lake Sector-V":30,"Karunamoyee":30,"Central Park":25,"City Centre":20,"Bengal Chemical":20,"Salt Lake Stadium":20,"Phoolbagan":15,"Sealdah":15},
    "Girish Park": {"Howrah Maidan":20,"Howrah Metro":20,"Mahakaran":15,"Esplanade":10,"Dakshineswar":20,"Baranagar":20,"Noapara":15,"Dum Dum":15,"Belgachhia":10,"Shyambazaar":5,"Shobhabazar Sutanuti":5,"Girish Park":0,"Mahatma Gandhi Road":5,"Central":5,"Chandni Chowk":10,"Park Street":10,"Maidan":10,"Rabindra Sadan":15,"Netaji Bhavan":15,"Jatin Das Park":15,"Kalighat":15,"Rabindra Sarobar":15,"Mahanayak Uttam Kumar":20,"Netaji":20,"Masterda Surya Sen":20,"Gitanjali":20,"Kavi Nazrul":20,"Shahid Khudiram":20,"Kavi Subhash":20,"New Garia":20,"Satyajit Ray":25,"Jyotirindra Nandi":30,"Kavi Sukanta":30,"Hemanta Mukhopadhyay":40,"Salt Lake Sector-V":30,"Karunamoyee":30,"Central Park":25,"City Centre":20,"Bengal Chemical":20,"Salt Lake Stadium":20,"Phoolbagan":15,"Sealdah":15},
    "Mahatma Gandhi Road": {"Howrah Maidan":20,"Howrah Metro":20,"Mahakaran":15,"Esplanade":10,"Dakshineswar":20,"Baranagar":20,"Noapara":15,"Dum Dum":15,"Belgachhia":10,"Shyambazaar":10,"Shobhabazar Sutanuti":5,"Girish Park":5,"Mahatma Gandhi Road":0,"Central":5,"Chandni Chowk":5,"Park Street":10,"Maidan":10,"Rabindra Sadan":10,"Netaji Bhavan":15,"Jatin Das Park":15,"Kalighat":15,"Rabindra Sarobar":15,"Mahanayak Uttam Kumar":15,"Netaji":20,"Masterda Surya Sen":20,"Gitanjali":20,"Kavi Nazrul":20,"Shahid Khudiram":20,"Kavi Subhash":20,"New Garia":20,"Satyajit Ray":25,"Jyotirindra Nandi":30,"Kavi Sukanta":30,"Hemanta Mukhopadhyay":40,"Salt Lake Sector-V":30,"Karunamoyee":30,"Central Park":25,"City Centre":20,"Bengal Chemical":20,"Salt Lake Stadium":20,"Phoolbagan":15,"Sealdah":15},
    "Central": {"Howrah Maidan":15,"Howrah Metro":15,"Mahakaran":10,"Esplanade":5,"Dakshineswar":20,"Baranagar":20,"Noapara":15,"Dum Dum":15,"Belgachhia":15,"Shyambazaar":10,"Shobhabazar Sutanuti":10,"Girish Park":5,"Mahatma Gandhi Road":5,"Central":0,"Chandni Chowk":5,"Park Street":10,"Maidan":10,"Rabindra Sadan":10,"Netaji Bhavan":10,"Jatin Das Park":15,"Kalighat":15,"Rabindra Sarobar":15,"Mahanayak Uttam Kumar":15,"Netaji":20,"Masterda Surya Sen":20,"Gitanjali":20,"Kavi Nazrul":20,"Shahid Khudiram":20,"Kavi Subhash":20,"New Garia":20,"Satyajit Ray":25,"Jyotirindra Nandi":30,"Kavi Sukanta":30,"Hemanta Mukhopadhyay":40,"Salt Lake Sector-V":25,"Karunamoyee":25,"Central Park":20,"City Centre":15,"Bengal Chemical":15,"Salt Lake Stadium":15,"Phoolbagan":10,"Sealdah":10},
    "Chandni Chowk": {"Howrah Maidan":15,"Howrah Metro":15,"Mahakaran":10,"Esplanade":5,"Dakshineswar":20,"Baranagar":20,"Noapara":20,"Dum Dum":15,"Belgachhia":15,"Shyambazaar":10,"Shobhabazar Sutanuti":10,"Girish Park":10,"Mahatma Gandhi Road":5,"Central":5,"Chandni Chowk":0,"Park Street":5,"Maidan":10,"Rabindra Sadan":10,"Netaji Bhavan":10,"Jatin Das Park":15,"Kalighat":15,"Rabindra Sarobar":15,"Mahanayak Uttam Kumar":15,"Netaji":20,"Masterda Surya Sen":20,"Gitanjali":20,"Kavi Nazrul":20,"Shahid Khudiram":20,"Kavi Subhash":20,"New Garia":20,"Satyajit Ray":25,"Jyotirindra Nandi":30,"Kavi Sukanta":30,"Hemanta Mukhopadhyay":40,"Salt Lake Sector-V":25,"Karunamoyee":25,"Central Park":20,"City Centre":15,"Bengal Chemical":15,"Salt Lake Stadium":15,"Phoolbagan":10,"Sealdah":10},
    "Park Street": {"Howrah Maidan":15,"Howrah Metro":15,"Mahakaran":10,"Esplanade":5,"Dakshineswar":20,"Baranagar":20,"Noapara":20,"Dum Dum":15,"Belgachhia":15,"Shyambazaar":15,"Shobhabazar Sutanuti":10,"Girish Park":10,"Mahatma Gandhi Road":10,"Central":10,"Chandni Chowk":5,"Park Street":0,"Maidan":5,"Rabindra Sadan":5,"Netaji Bhavan":10,"Jatin Das Park":10,"Kalighat":10,"Rabindra Sarobar":15,"Mahanayak Uttam Kumar":15,"Netaji":15,"Masterda Surya Sen":20,"Gitanjali":20,"Kavi Nazrul":20,"Shahid Khudiram":20,"Kavi Subhash":20,"New Garia":20,"Satyajit Ray":25,"Jyotirindra Nandi":30,"Kavi Sukanta":30,"Hemanta Mukhopadhyay":40,"Salt Lake Sector-V":25,"Karunamoyee":25,"Central Park":20,"City Centre":15,"Bengal Chemical":15,"Salt Lake Stadium":15,"Phoolbagan":10,"Sealdah":10},
    "Maidan": {"Howrah Maidan":15,"Howrah Metro":15,"Mahakaran":10,"Esplanade":5,"Dakshineswar":20,"Baranagar":20,"Noapara":20,"Dum Dum":20,"Belgachhia":15,"Shyambazaar":15,"Shobhabazar Sutanuti":15,"Girish Park":10,"Mahatma Gandhi Road":10,"Central":10,"Chandni Chowk":10,"Park Street":5,"Maidan":0,"Rabindra Sadan":5,"Netaji Bhavan":5,"Jatin Das Park":10,"Kalighat":10,"Rabindra Sarobar":10,"Mahanayak Uttam Kumar":15,"Netaji":15,"Masterda Surya Sen":15,"Gitanjali":20,"Kavi Nazrul":20,"Shahid Khudiram":20,"Kavi Subhash":20,"New Garia":20,"Satyajit Ray":25,"Jyotirindra Nandi":30,"Kavi Sukanta":30,"Hemanta Mukhopadhyay":40,"Salt Lake Sector-V":25,"Karunamoyee":25,"Central Park":20,"City Centre":15,"Bengal Chemical":15,"Salt Lake Stadium":15,"Phoolbagan":10,"Sealdah":10},
    "Rabindra Sadan": {"Howrah Maidan":20,"Howrah Metro":20,"Mahakaran":15,"Esplanade":10,"Dakshineswar":20,"Baranagar":20,"Noapara":20,"Dum Dum":20,"Belgachhia":15,"Shyambazaar":15,"Shobhabazar Sutanuti":15,"Girish Park":15,"Mahatma Gandhi Road":10,"Central":10,"Chandni Chowk":10,"Park Street":5,"Maidan":5,"Rabindra Sadan":0,"Netaji Bhavan":5,"Jatin Das Park":5,"Kalighat":10,"Rabindra Sarobar":10,"Mahanayak Uttam Kumar":15,"Netaji":15,"Masterda Surya Sen":15,"Gitanjali":15,"Kavi Nazrul":20,"Shahid Khudiram":20,"Kavi Subhash":20,"New Garia":20,"Satyajit Ray":25,"Jyotirindra Nandi":30,"Kavi Sukanta":30,"Hemanta Mukhopadhyay":40,"Salt Lake Sector-V":30,"Karunamoyee":30,"Central Park":25,"City Centre":20,"Bengal Chemical":20,"Salt Lake Stadium":20,"Phoolbagan":15,"Sealdah":15},
    "Netaji Bhavan": {"Howrah Maidan":20,"Howrah Metro":20,"Mahakaran":15,"Esplanade":10,"Dakshineswar":20,"Baranagar":20,"Noapara":20,"Dum Dum":20,"Belgachhia":20,"Shyambazaar":15,"Shobhabazar Sutanuti":15,"Girish Park":15,"Mahatma Gandhi Road":15,"Central":10,"Chandni Chowk":10,"Park Street":10,"Maidan":5,"Rabindra Sadan":5,"Netaji Bhavan":0,"Jatin Das Park":5,"Kalighat":5,"Rabindra Sarobar":10,"Mahanayak Uttam Kumar":10,"Netaji":15,"Masterda Surya Sen":15,"Gitanjali":15,"Kavi Nazrul":20,"Shahid Khudiram":20,"Kavi Subhash":20,"New Garia":20,"Satyajit Ray":25,"Jyotirindra Nandi":30,"Kavi Sukanta":30,"Hemanta Mukhopadhyay":40,"Salt Lake Sector-V":30,"Karunamoyee":30,"Central Park":25,"City Centre":20,"Bengal Chemical":20,"Salt Lake Stadium":20,"Phoolbagan":15,"Sealdah":15},
    "Jatin Das Park": {"Howrah Maidan":20,"Howrah Metro":20,"Mahakaran":15,"Esplanade":10,"Dakshineswar":20,"Baranagar":20,"Noapara":20,"Dum Dum":20,"Belgachhia":20,"Shyambazaar":15,"Shobhabazar Sutanuti":15,"Girish Park":15,"Mahatma Gandhi Road":15,"Central":15,"Chandni Chowk":15,"Park Street":10,"Maidan":10,"Rabindra Sadan":5,"Netaji Bhavan":5,"Jatin Das Park":0,"Kalighat":5,"Rabindra Sarobar":5,"Mahanayak Uttam Kumar":10,"Netaji":15,"Masterda Surya Sen":15,"Gitanjali":15,"Kavi Nazrul":15,"Shahid Khudiram":20,"Kavi Subhash":20,"New Garia":20,"Satyajit Ray":25,"Jyotirindra Nandi":30,"Kavi Sukanta":30,"Hemanta Mukhopadhyay":40,"Salt Lake Sector-V":30,"Karunamoyee":30,"Central Park":25,"City Centre":20,"Bengal Chemical":20,"Salt Lake Stadium":20,"Phoolbagan":15,"Sealdah":15},
    "Kalighat": {"Howrah Maidan":25,"Howrah Metro":25,"Mahakaran":20,"Esplanade":15,"Dakshineswar":25,"Baranagar":20,"Noapara":20,"Dum Dum":20,"Belgachhia":20,"Shyambazaar":20,"Shobhabazar Sutanuti":15,"Girish Park":15,"Mahatma Gandhi Road":15,"Central":15,"Chandni Chowk":15,"Park Street":10,"Maidan":10,"Rabindra Sadan":10,"Netaji Bhavan":5,"Jatin Das Park":5,"Kalighat":0,"Rabindra Sarobar":5,"Mahanayak Uttam Kumar":10,"Netaji":10,"Masterda Surya Sen":15,"Gitanjali":15,"Kavi Nazrul":15,"Shahid Khudiram":15,"Kavi Subhash":20,"New Garia":20,"Satyajit Ray":25,"Jyotirindra Nandi":30,"Kavi Sukanta":30,"Hemanta Mukhopadhyay":40,"Salt Lake Sector-V":35,"Karunamoyee":35,"Central Park":30,"City Centre":25,"Bengal Chemical":25,"Salt Lake Stadium":25,"Phoolbagan":20,"Sealdah":20},
    "Rabindra Sarobar": {"Howrah Maidan":25,"Howrah Metro":25,"Mahakaran":20,"Esplanade":15,"Dakshineswar":25,"Baranagar":20,"Noapara":20,"Dum Dum":20,"Belgachhia":20,"Shyambazaar":20,"Shobhabazar Sutanuti":20,"Girish Park":15,"Mahatma Gandhi Road":15,"Central":15,"Chandni Chowk":15,"Park Street":15,"Maidan":10,"Rabindra Sadan":10,"Netaji Bhavan":10,"Jatin Das Park":5,"Kalighat":5,"Rabindra Sarobar":0,"Mahanayak Uttam Kumar":5,"Netaji":10,"Masterda Surya Sen":10,"Gitanjali":15,"Kavi Nazrul":15,"Shahid Khudiram":15,"Kavi Subhash":15,"New Garia":15,"Satyajit Ray":20,"Jyotirindra Nandi":25,"Kavi Sukanta":25,"Hemanta Mukhopadhyay":35,"Salt Lake Sector-V":35,"Karunamoyee":35,"Central Park":30,"City Centre":25,"Bengal Chemical":25,"Salt Lake Stadium":25,"Phoolbagan":20,"Sealdah":20},
    "Mahanayak Uttam Kumar": {"Howrah Maidan":25,"Howrah Metro":25,"Mahakaran":20,"Esplanade":15,"Dakshineswar":25,"Baranagar":25,"Noapara":20,"Dum Dum":20,"Belgachhia":20,"Shyambazaar":20,"Shobhabazar Sutanuti":20,"Girish Park":20,"Mahatma Gandhi Road":15,"Central":15,"Chandni Chowk":15,"Park Street":15,"Maidan":15,"Rabindra Sadan":15,"Netaji Bhavan":10,"Jatin Das Park":10,"Kalighat":10,"Rabindra Sarobar":5,"Mahanayak Uttam Kumar":0,"Netaji":5,"Masterda Surya Sen":10,"Gitanjali":10,"Kavi Nazrul":15,"Shahid Khudiram":15,"Kavi Subhash":15,"New Garia":15,"Satyajit Ray":20,"Jyotirindra Nandi":25,"Kavi Sukanta":25,"Hemanta Mukhopadhyay":35,"Salt Lake Sector-V":35,"Karunamoyee":35,"Central Park":30,"City Centre":25,"Bengal Chemical":25,"Salt Lake Stadium":25,"Phoolbagan":20,"Sealdah":20},
    "Netaji": {"Howrah Maidan":25,"Howrah Metro":25,"Mahakaran":20,"Esplanade":15,"Dakshineswar":25,"Baranagar":25,"Noapara":25,"Dum Dum":20,"Belgachhia":20,"Shyambazaar":20,"Shobhabazar Sutanuti":20,"Girish Park":20,"Mahatma Gandhi Road":20,"Central":20,"Chandni Chowk":20,"Park Street":15,"Maidan":15,"Rabindra Sadan":15,"Netaji Bhavan":15,"Jatin Das Park":15,"Kalighat":10,"Rabindra Sarobar":10,"Mahanayak Uttam Kumar":5,"Netaji":0,"Masterda Surya Sen":5,"Gitanjali":10,"Kavi Nazrul":10,"Shahid Khudiram":15,"Kavi Subhash":15,"New Garia":15,"Satyajit Ray":20,"Jyotirindra Nandi":25,"Kavi Sukanta":25,"Hemanta Mukhopadhyay":35,"Salt Lake Sector-V":35,"Karunamoyee":35,"Central Park":30,"City Centre":25,"Bengal Chemical":25,"Salt Lake Stadium":25,"Phoolbagan":20,"Sealdah":20},
    "Masterda Surya Sen": {"Howrah Maidan":30,"Howrah Metro":30,"Mahakaran":25,"Esplanade":20,"Dakshineswar":25,"Baranagar":25,"Noapara":25,"Dum Dum":20,"Belgachhia":20,"Shyambazaar":20,"Shobhabazar Sutanuti":20,"Girish Park":20,"Mahatma Gandhi Road":20,"Central":20,"Chandni Chowk":20,"Park Street":20,"Maidan":15,"Rabindra Sadan":15,"Netaji Bhavan":15,"Jatin Das Park":15,"Kalighat":15,"Rabindra Sarobar":10,"Mahanayak Uttam Kumar":10,"Netaji":5,"Masterda Surya Sen":0,"Gitanjali":5,"Kavi Nazrul":10,"Shahid Khudiram":10,"Kavi Subhash":15,"New Garia":15,"Satyajit Ray":20,"Jyotirindra Nandi":25,"Kavi Sukanta":25,"Hemanta Mukhopadhyay":35,"Salt Lake Sector-V":40,"Karunamoyee":40,"Central Park":35,"City Centre":30,"Bengal Chemical":30,"Salt Lake Stadium":30,"Phoolbagan":25,"Sealdah":25},
    "Gitanjali": {"Howrah Maidan":30,"Howrah Metro":30,"Mahakaran":25,"Esplanade":20,"Dakshineswar":25,"Baranagar":25,"Noapara":25,"Dum Dum":25,"Belgachhia":20,"Shyambazaar":20,"Shobhabazar Sutanuti":20,"Girish Park":20,"Mahatma Gandhi Road":20,"Central":20,"Chandni Chowk":20,"Park Street":20,"Maidan":20,"Rabindra Sadan":15,"Netaji Bhavan":15,"Jatin Das Park":15,"Kalighat":15,"Rabindra Sarobar":15,"Mahanayak Uttam Kumar":10,"Netaji":10,"Masterda Surya Sen":5,"Gitanjali":0,"Kavi Nazrul":5,"Shahid Khudiram":10,"Kavi Subhash":10,"New Garia":10,"Satyajit Ray":15,"Jyotirindra Nandi":20,"Kavi Sukanta":20,"Hemanta Mukhopadhyay":30,"Salt Lake Sector-V":40,"Karunamoyee":40,"Central Park":35,"City Centre":30,"Bengal Chemical":30,"Salt Lake Stadium":30,"Phoolbagan":25,"Sealdah":25},
    "Kavi Nazrul": {"Howrah Maidan":30,"Howrah Metro":30,"Mahakaran":25,"Esplanade":20,"Dakshineswar":25,"Baranagar":25,"Noapara":25,"Dum Dum":25,"Belgachhia":25,"Shyambazaar":20,"Shobhabazar Sutanuti":20,"Girish Park":20,"Mahatma Gandhi Road":20,"Central":20,"Chandni Chowk":20,"Park Street":20,"Maidan":20,"Rabindra Sadan":20,"Netaji Bhavan":20,"Jatin Das Park":15,"Kalighat":15,"Rabindra Sarobar":15,"Mahanayak Uttam Kumar":15,"Netaji":10,"Masterda Surya Sen":10,"Gitanjali":5,"Kavi Nazrul":0,"Shahid Khudiram":5,"Kavi Subhash":10,"New Garia":10,"Satyajit Ray":15,"Jyotirindra Nandi":20,"Kavi Sukanta":20,"Hemanta Mukhopadhyay":30,"Salt Lake Sector-V":40,"Karunamoyee":40,"Central Park":35,"City Centre":30,"Bengal Chemical":30,"Salt Lake Stadium":30,"Phoolbagan":25,"Sealdah":25},
    "Shahid Khudiram": {"Howrah Maidan":30,"Howrah Metro":30,"Mahakaran":25,"Esplanade":20,"Dakshineswar":25,"Baranagar":25,"Noapara":25,"Dum Dum":25,"Belgachhia":25,"Shyambazaar":20,"Shobhabazar Sutanuti":20,"Girish Park":20,"Mahatma Gandhi Road":20,"Central":20,"Chandni Chowk":20,"Park Street":20,"Maidan":20,"Rabindra Sadan":20,"Netaji Bhavan":20,"Jatin Das Park":20,"Kalighat":15,"Rabindra Sarobar":15,"Mahanayak Uttam Kumar":15,"Netaji":15,"Masterda Surya Sen":10,"Gitanjali":10,"Kavi Nazrul":5,"Shahid Khudiram":0,"Kavi Subhash":5,"New Garia":5,"Satyajit Ray":10,"Jyotirindra Nandi":15,"Kavi Sukanta":15,"Hemanta Mukhopadhyay":25,"Salt Lake Sector-V":40,"Karunamoyee":40,"Central Park":35,"City Centre":30,"Bengal Chemical":30,"Salt Lake Stadium":30,"Phoolbagan":25,"Sealdah":25},
    "Kavi Subhash": {"Howrah Maidan":30,"Howrah Metro":30,"Mahakaran":25,"Esplanade":20,"Dakshineswar":25,"Baranagar":25,"Noapara":25,"Dum Dum":25,"Belgachhia":25,"Shyambazaar":25,"Shobhabazar Sutanuti":25,"Girish Park":20,"Mahatma Gandhi Road":20,"Central":20,"Chandni Chowk":20,"Park Street":20,"Maidan":20,"Rabindra Sadan":20,"Netaji Bhavan":20,"Jatin Das Park":20,"Kalighat":20,"Rabindra Sarobar":15,"Mahanayak Uttam Kumar":15,"Netaji":15,"Masterda Surya Sen":15,"Gitanjali":10,"Kavi Nazrul":10,"Shahid Khudiram":5,"Kavi Subhash":0,"New Garia":5,"Satyajit Ray":5,"Jyotirindra Nandi":10,"Kavi Sukanta":10,"Hemanta Mukhopadhyay":20,"Salt Lake Sector-V":40,"Karunamoyee":40,"Central Park":35,"City Centre":30,"Bengal Chemical":30,"Salt Lake Stadium":30,"Phoolbagan":25,"Sealdah":25},
    "New Garia": {"Howrah Maidan":30,"Howrah Metro":30,"Mahakaran":25,"Esplanade":20,"Dakshineswar":25,"Baranagar":25,"Noapara":25,"Dum Dum":25,"Belgachhia":25,"Shyambazaar":25,"Shobhabazar Sutanuti":25,"Girish Park":20,"Mahatma Gandhi Road":20,"Central":20,"Chandni Chowk":20,"Park Street":20,"Maidan":20,"Rabindra Sadan":20,"Netaji Bhavan":20,"Jatin Das Park":20,"Kalighat":20,"Rabindra Sarobar":15,"Mahanayak Uttam Kumar":15,"Netaji":15,"Masterda Surya Sen":15,"Gitanjali":10,"Kavi Nazrul":10,"Shahid Khudiram":5,"Kavi Subhash":5,"New Garia":0,"Satyajit Ray":10,"Jyotirindra Nandi":15,"Kavi Sukanta":15,"Hemanta Mukhopadhyay":25,"Salt Lake Sector-V":40,"Karunamoyee":40,"Central Park":35,"City Centre":30,"Bengal Chemical":30,"Salt Lake Stadium":30,"Phoolbagan":25,"Sealdah":25},
    "Satyajit Ray": {"Howrah Maidan":35,"Howrah Metro":35,"Mahakaran":30,"Esplanade":25,"Dakshineswar":30,"Baranagar":30,"Noapara":30,"Dum Dum":30,"Belgachhia":30,"Shyambazaar":30,"Shobhabazar Sutanuti":30,"Girish Park":25,"Mahatma Gandhi Road":25,"Central":25,"Chandni Chowk":25,"Park Street":25,"Maidan":25,"Rabindra Sadan":25,"Netaji Bhavan":25,"Jatin Das Park":25,"Kalighat":25,"Rabindra Sarobar":20,"Mahanayak Uttam Kumar":20,"Netaji":20,"Masterda Surya Sen":20,"Gitanjali":15,"Kavi Nazrul":15,"Shahid Khudiram":10,"Kavi Subhash":5,"New Garia":10,"Satyajit Ray":0,"Jyotirindra Nandi":5,"Kavi Sukanta":10,"Hemanta Mukhopadhyay":10,"Salt Lake Sector-V":45,"Karunamoyee":45,"Central Park":40,"City Centre":35,"Bengal Chemical":35,"Salt Lake Stadium":35,"Phoolbagan":30,"Sealdah":30},
    "Jyotirindra Nandi": {"Howrah Maidan":40,"Howrah Metro":40,"Mahakaran":35,"Esplanade":30,"Dakshineswar":35,"Baranagar":35,"Noapara":35,"Dum Dum":35,"Belgachhia":35,"Shyambazaar":35,"Shobhabazar Sutanuti":35,"Girish Park":30,"Mahatma Gandhi Road":30,"Central":30,"Chandni Chowk":30,"Park Street":30,"Maidan":30,"Rabindra Sadan":30,"Netaji Bhavan":30,"Jatin Das Park":30,"Kalighat":30,"Rabindra Sarobar":25,"Mahanayak Uttam Kumar":25,"Netaji":25,"Masterda Surya Sen":25,"Gitanjali":20,"Kavi Nazrul":20,"Shahid Khudiram":15,"Kavi Subhash":10,"New Garia":15,"Satyajit Ray":5,"Jyotirindra Nandi":0,"Kavi Sukanta":5,"Hemanta Mukhopadhyay":10,"Salt Lake Sector-V":50,"Karunamoyee":50,"Central Park":45,"City Centre":40,"Bengal Chemical":40,"Salt Lake Stadium":40,"Phoolbagan":35,"Sealdah":35},
    "Kavi Sukanta": {"Howrah Maidan":40,"Howrah Metro":40,"Mahakaran":35,"Esplanade":30,"Dakshineswar":35,"Baranagar":35,"Noapara":35,"Dum Dum":35,"Belgachhia":35,"Shyambazaar":35,"Shobhabazar Sutanuti":35,"Girish Park":30,"Mahatma Gandhi Road":30,"Central":30,"Chandni Chowk":30,"Park Street":30,"Maidan":30,"Rabindra Sadan":30,"Netaji Bhavan":30,"Jatin Das Park":30,"Kalighat":30,"Rabindra Sarobar":25,"Mahanayak Uttam Kumar":25,"Netaji":25,"Masterda Surya Sen":25,"Gitanjali":20,"Kavi Nazrul":20,"Shahid Khudiram":15,"Kavi Subhash":10,"New Garia":15,"Satyajit Ray":10,"Jyotirindra Nandi":5,"Kavi Sukanta":0,"Hemanta Mukhopadhyay":5,"Salt Lake Sector-V":50,"Karunamoyee":50,"Central Park":45,"City Centre":40,"Bengal Chemical":40,"Salt Lake Stadium":40,"Phoolbagan":35,"Sealdah":35},
    "Hemanta Mukhopadhyay": {"Howrah Maidan":50,"Howrah Metro":50,"Mahakaran":45,"Esplanade":40,"Dakshineswar":45,"Baranagar":45,"Noapara":45,"Dum Dum":45,"Belgachhia":45,"Shyambazaar":45,"Shobhabazar Sutanuti":45,"Girish Park":40,"Mahatma Gandhi Road":40,"Central":40,"Chandni Chowk":40,"Park Street":40,"Maidan":40,"Rabindra Sadan":40,"Netaji Bhavan":40,"Jatin Das Park":40,"Kalighat":40,"Rabindra Sarobar":35,"Mahanayak Uttam Kumar":35,"Netaji":35,"Masterda Surya Sen":35,"Gitanjali":30,"Kavi Nazrul":30,"Shahid Khudiram":25,"Kavi Subhash":20,"New Garia":25,"Satyajit Ray":10,"Jyotirindra Nandi":10,"Kavi Sukanta":5,"Hemanta Mukhopadhyay":0,"Salt Lake Sector-V":60,"Karunamoyee":60,"Central Park":55,"City Centre":50,"Bengal Chemical":50,"Salt Lake Stadium":50,"Phoolbagan":45,"Sealdah":45},
    
    // Green Line stations
    "Salt Lake Sector-V": {"Salt Lake Sector-V":0,"Karunamoyee":5,"Central Park":10,"City Centre":10,"Bengal Chemical":10,"Salt Lake Stadium":10,"Phoolbagan":20,"Sealdah":20,"Mahakaran":30,"Esplanade":30,"Howrah Metro":30,"Howrah Maidan":30,"Dakshineswar":40,"Baranagar":40,"Noapara":40,"Dum Dum":35,"Belgachhia":35,"Shyambazaar":35,"Shobhabazar Sutanuti":30,"Girish Park":30,"Mahatma Gandhi Road":30,"Central":25,"Chandni Chowk":25,"Park Street":25,"Maidan":25,"Rabindra Sadan":30,"Netaji Bhavan":30,"Jatin Das Park":30,"Kalighat":35,"Rabindra Sarobar":35,"Mahanayak Uttam Kumar":35,"Netaji":35,"Masterda Surya Sen":40,"Gitanjali":40,"Kavi Nazrul":40,"Shahid Khudiram":40,"Kavi Subhash":40,"New Garia":40,"Satyajit Ray":45,"Jyotirindra Nandi":50,"Kavi Sukanta":50,"Hemanta Mukhopadhyay":60},
    "Karunamoyee": {"Karunamoyee":0,"Salt Lake Sector-V":5,"Central Park":5,"City Centre":5,"Bengal Chemical":10,"Salt Lake Stadium":10,"Phoolbagan":20,"Sealdah":20,"Mahakaran":30,"Esplanade":30,"Howrah Metro":30,"Howrah Maidan":30,"Dakshineswar":40,"Baranagar":40,"Noapara":40,"Dum Dum":35,"Belgachhia":35,"Shyambazaar":35,"Shobhabazar Sutanuti":30,"Girish Park":30,"Mahatma Gandhi Road":30,"Central":25,"Chandni Chowk":25,"Park Street":25,"Maidan":25,"Rabindra Sadan":30,"Netaji Bhavan":30,"Jatin Das Park":30,"Kalighat":35,"Rabindra Sarobar":35,"Mahanayak Uttam Kumar":35,"Netaji":35,"Masterda Surya Sen":40,"Gitanjali":40,"Kavi Nazrul":40,"Shahid Khudiram":40,"Kavi Subhash":40,"New Garia":40,"Satyajit Ray":45,"Jyotirindra Nandi":50,"Kavi Sukanta":50,"Hemanta Mukhopadhyay":60},
    "Central Park": {"Central Park":0,"Salt Lake Sector-V":10,"Karunamoyee":5,"City Centre":5,"Bengal Chemical":10,"Salt Lake Stadium":10,"Phoolbagan":10,"Sealdah":20,"Mahakaran":30,"Esplanade":20,"Howrah Metro":25,"Howrah Maidan":25,"Dakshineswar":35,"Baranagar":35,"Noapara":35,"Dum Dum":30,"Belgachhia":30,"Shyambazaar":30,"Shobhabazar Sutanuti":25,"Girish Park":25,"Mahatma Gandhi Road":25,"Central":20,"Chandni Chowk":20,"Park Street":20,"Maidan":20,"Rabindra Sadan":25,"Netaji Bhavan":25,"Jatin Das Park":25,"Kalighat":30,"Rabindra Sarobar":30,"Mahanayak Uttam Kumar":30,"Netaji":30,"Masterda Surya Sen":35,"Gitanjali":35,"Kavi Nazrul":35,"Shahid Khudiram":35,"Kavi Subhash":35,"New Garia":35,"Satyajit Ray":40,"Jyotirindra Nandi":45,"Kavi Sukanta":45,"Hemanta Mukhopadhyay":55},
    "City Centre": {"City Centre":0,"Salt Lake Sector-V":10,"Karunamoyee":5,"Central Park":5,"Bengal Chemical":5,"Salt Lake Stadium":5,"Phoolbagan":10,"Sealdah":20,"Mahakaran":20,"Esplanade":20,"Howrah Metro":20,"Howrah Maidan":20,"Dakshineswar":30,"Baranagar":30,"Noapara":30,"Dum Dum":25,"Belgachhia":25,"Shyambazaar":25,"Shobhabazar Sutanuti":20,"Girish Park":20,"Mahatma Gandhi Road":20,"Central":15,"Chandni Chowk":15,"Park Street":15,"Maidan":15,"Rabindra Sadan":20,"Netaji Bhavan":20,"Jatin Das Park":20,"Kalighat":25,"Rabindra Sarobar":25,"Mahanayak Uttam Kumar":25,"Netaji":25,"Masterda Surya Sen":30,"Gitanjali":30,"Kavi Nazrul":30,"Shahid Khudiram":30,"Kavi Subhash":30,"New Garia":30,"Satyajit Ray":35,"Jyotirindra Nandi":40,"Kavi Sukanta":40,"Hemanta Mukhopadhyay":50},
    "Bengal Chemical": {"Bengal Chemical":0,"Salt Lake Sector-V":10,"Karunamoyee":10,"Central Park":10,"City Centre":5,"Salt Lake Stadium":5,"Phoolbagan":10,"Sealdah":10,"Mahakaran":20,"Esplanade":20,"Howrah Metro":20,"Howrah Maidan":20,"Dakshineswar":30,"Baranagar":30,"Noapara":30,"Dum Dum":25,"Belgachhia":25,"Shyambazaar":25,"Shobhabazar Sutanuti":20,"Girish Park":20,"Mahatma Gandhi Road":20,"Central":15,"Chandni Chowk":15,"Park Street":15,"Maidan":15,"Rabindra Sadan":20,"Netaji Bhavan":20,"Jatin Das Park":20,"Kalighat":25,"Rabindra Sarobar":25,"Mahanayak Uttam Kumar":25,"Netaji":25,"Masterda Surya Sen":30,"Gitanjali":30,"Kavi Nazrul":30,"Shahid Khudiram":30,"Kavi Subhash":30,"New Garia":30,"Satyajit Ray":35,"Jyotirindra Nandi":40,"Kavi Sukanta":40,"Hemanta Mukhopadhyay":50},
    "Salt Lake Stadium": {"Salt Lake Stadium":0,"Salt Lake Sector-V":10,"Karunamoyee":10,"Central Park":10,"City Centre":5,"Bengal Chemical":5,"Phoolbagan":5,"Sealdah":10,"Mahakaran":20,"Esplanade":20,"Howrah Metro":20,"Howrah Maidan":20,"Dakshineswar":30,"Baranagar":30,"Noapara":30,"Dum Dum":25,"Belgachhia":25,"Shyambazaar":25,"Shobhabazar Sutanuti":20,"Girish Park":20,"Mahatma Gandhi Road":20,"Central":15,"Chandni Chowk":15,"Park Street":15,"Maidan":15,"Rabindra Sadan":20,"Netaji Bhavan":20,"Jatin Das Park":20,"Kalighat":25,"Rabindra Sarobar":25,"Mahanayak Uttam Kumar":25,"Netaji":25,"Masterda Surya Sen":30,"Gitanjali":30,"Kavi Nazrul":30,"Shahid Khudiram":30,"Kavi Subhash":30,"New Garia":30,"Satyajit Ray":35,"Jyotirindra Nandi":40,"Kavi Sukanta":40,"Hemanta Mukhopadhyay":50},
    "Phoolbagan": {"Phoolbagan":0,"Salt Lake Sector-V":20,"Karunamoyee":20,"Central Park":10,"City Centre":10,"Bengal Chemical":10,"Salt Lake Stadium":5,"Sealdah":10,"Mahakaran":20,"Esplanade":10,"Howrah Metro":20,"Howrah Maidan":20,"Dakshineswar":25,"Baranagar":25,"Noapara":25,"Dum Dum":20,"Belgachhia":20,"Shyambazaar":20,"Shobhabazar Sutanuti":15,"Girish Park":15,"Mahatma Gandhi Road":15,"Central":10,"Chandni Chowk":10,"Park Street":10,"Maidan":10,"Rabindra Sadan":15,"Netaji Bhavan":15,"Jatin Das Park":15,"Kalighat":20,"Rabindra Sarobar":20,"Mahanayak Uttam Kumar":20,"Netaji":20,"Masterda Surya Sen":25,"Gitanjali":25,"Kavi Nazrul":25,"Shahid Khudiram":25,"Kavi Subhash":25,"New Garia":25,"Satyajit Ray":30,"Jyotirindra Nandi":35,"Kavi Sukanta":35,"Hemanta Mukhopadhyay":45},
    "Sealdah": {"Sealdah":0,"Salt Lake Sector-V":20,"Karunamoyee":20,"Central Park":20,"City Centre":20,"Bengal Chemical":10,"Salt Lake Stadium":10,"Phoolbagan":10,"Mahakaran":10,"Esplanade":10,"Howrah Metro":15,"Howrah Maidan":15,"Dakshineswar":25,"Baranagar":25,"Noapara":25,"Dum Dum":20,"Belgachhia":20,"Shyambazaar":20,"Shobhabazar Sutanuti":15,"Girish Park":15,"Mahatma Gandhi Road":15,"Central":10,"Chandni Chowk":10,"Park Street":10,"Maidan":10,"Rabindra Sadan":15,"Netaji Bhavan":15,"Jatin Das Park":15,"Kalighat":20,"Rabindra Sarobar":20,"Mahanayak Uttam Kumar":20,"Netaji":20,"Masterda Surya Sen":25,"Gitanjali":25,"Kavi Nazrul":25,"Shahid Khudiram":25,"Kavi Subhash":25,"New Garia":25,"Satyajit Ray":30,"Jyotirindra Nandi":35,"Kavi Sukanta":35,"Hemanta Mukhopadhyay":45},
    
    // Purple Line stations
    "Joka": {"Joka":0,"Thakurpukur":5,"Sakher Bazar":10,"Behala Chowrashta":10,"Behala Bazar":20,"Taratala":20,"Majherhat":20},
    "Thakurpukur": {"Joka":5,"Thakurpukur":0,"Sakher Bazar":5,"Behala Chowrashta":10,"Behala Bazar":10,"Taratala":20,"Majherhat":20},
    "Sakher Bazar": {"Joka":10,"Thakurpukur":5,"Sakher Bazar":0,"Behala Chowrashta":5,"Behala Bazar":10,"Taratala":10,"Majherhat":20},
    "Behala Chowrashta": {"Joka":10,"Thakurpukur":10,"Sakher Bazar":5,"Behala Chowrashta":0,"Behala Bazar":5,"Taratala":10,"Majherhat":10},
    "Behala Bazar": {"Joka":20,"Thakurpukur":10,"Sakher Bazar":10,"Behala Chowrashta":5,"Behala Bazar":0,"Taratala":5,"Majherhat":10},
    "Taratala": {"Joka":20,"Thakurpukur":20,"Sakher Bazar":10,"Behala Chowrashta":10,"Behala Bazar":5,"Taratala":0,"Majherhat":5},
    "Majherhat": {"Joka":20,"Thakurpukur":20,"Sakher Bazar":20,"Behala Chowrashta":10,"Behala Bazar":10,"Taratala":5,"Majherhat":0},
    
    // Yellow Line stations
    "Dum Dum Cantonment": {"Noapara":10,"Dum Dum Cantonment":0,"Jessore Road":10,"Jai Hind":20},
    "Jessore Road": {"Noapara":20,"Dum Dum Cantonment":10,"Jessore Road":0,"Jai Hind":10},
    "Jai Hind": {"Noapara":30,"Dum Dum Cantonment":20,"Jessore Road":10,"Jai Hind":0}
};
