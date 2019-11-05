# Changelog
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.2] - 2019-11-04
### Added
- Added a gold card highlight for Kaya's turn to indicate what she needs to pick for the user to get a new phrase
- Word Search table that allows users to reverse search a word to see which words they need to go through prior to accessing it
### Changed
- Green highlight is now a higher priority than Blue since it has a lower chance to occur
- Edited tips to match new information
- Urayomi phrases are now hidden at the start since Kaya will never select them
  - Some futsuyomi phrases are now hidden from the start since it looks like Kaya only chooses only the first futsuyomi phrase and none of the others
  - Additional futsuyomi phrases that start with ん are also now hidden from the start (choosing them causes an instant game over)
- Made it so the starting phrase list only updates when the word list is closed if a change was made
### Fixed
- Fixed a bug where the green highlight shared the same requirement as priconneyomi
- Fixed incorrect spelling of Kaya in README

## [0.0.1] - 2019-11-03
### Added
- `Priconneyomi` phrases are now gray-scaled if it is Kaya's turn
- Latest selection will now be displayed at the top
- Highlighting as suggested by `Crimson#3288` ; Used to help the Player choose a path to get new phrases
  - `Green` Color: Kaya has a chance of selecting a new phrase
  - `Blue` Color: The Player has a chance of selecting a new phrase after Kaya's choice
  - `Red` Color: Kaya and the Player has a chance of both selecting new phrases
- Added a Tips menu to explain what the different highlights/image styling means
- Added error catching so a user's word list isn't completely screwed with every error in word_list.json
  - Look at the console (F12) to see which word has issues and re-add it manually if needed
  - Any modified words are now alerted via Alert popup
### Changed
- Word list is now in an actual list rather than row-per-category
- Adjusted Open Graph icon size
- `Priconneyomi` phrases will no longer appear at the start
### Fixed
- Fixed a lot of issues regarding characters, i.e. `ゅ` was used instead of `ゆ`

## [0.0.0] - 2019-11-02
Project start!
### Added
- Basic functionality
- Progress saving