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

// Keep the fareData object from your original code
const fareData = {
    // [Keep all your existing fareData here - it's too long to repeat]
    // Just copy it from your original code
};
