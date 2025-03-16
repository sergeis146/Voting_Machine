# # Voting Machine

## About This Project
This is a simple voting system that lets users cast their vote, see real-time results, and deal with a lot of pop-up ads. Features include:

- Live vote tracking using Firebase
- CAPTCHA verification before voting
- One vote per user
- Annoying pop-up ads every few seconds
- A fake hacking page if you click an ad
- An admin reset button to erase all votes

## Features & How They Work

### Voting System
Users can vote for one of four candidates. A CAPTCHA must be completed before voting. Votes are stored in Firebase and can be viewed on the results page. Users can only vote once, tracked using localStorage.

### Results Page
Live updates from Firebase show current votes. An admin can reset all votes if they know the reset password.

### Ads & Disruptions
Pop-up ads appear every few seconds in random locations. Clicking an ad takes the user to a fake page saying their data is being stolen.

## How to Use
1. Go to the homepage.
2. Click "Start Voting" to go to the voting page.
3. Complete the CAPTCHA and submit your vote.
4. After voting, the "View Results" button appears.
5. Click it to see live results.
6. The admin can reset votes using a password.

## Tech Stack
- HTML / CSS for structure and styling
- JavaScript for functionality
- Firebase Realtime Database for storing votes

## File Structure
```
📁 Voting_Machine/
 ├── index.html         # Homepage
 ├── vote.html          # Voting page
 ├── results.html       # Live results page
 ├── ad.html            # Fake ad page
 ├── style.css          # All site styling
 ├── main.js            # Voting logic
 ├── results.js         # Fetches and updates results
 ├── ads.js             # Annoying pop-up ads
 ├── firebase-config.js # Firebase connection
 ├── images/            # Candidate & ad images
```

## Disclaimer
This is a joke project and not a real voting system. Do not use it for anything serious.

