# Changelog
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.5] - 2021-04-30
### Added
- Shiritori Game Version 2
  - Added 58 new panels
  - Added 248 new words
### Changed
- Modified `word_list.json` to use words from the game's database rather than fan wikis
  - Saved words may be removed as a result

## [0.0.4] - 2019-11-13
### Added
- Added link to GitHub repository in footer
### Changed
- Toggling "Find Resulting Words?" after performing a search and resetting it no longer shows you results from your previous search

## [0.0.3] - 2019-11-06
### Added
- Added an undo button in case the player makes a mistake
  - Undo button is disabled when Rush mode is toggled
  - Undo button only allows for one undo
- Added the option to search for the phrases that the word you selected can go into in Word Search
### Changed
- Tips formatting
- Word list is now hidden when a game is in progress to avoid tampering
  - It will be shown when the game in progress is reset.
### Fixed
- Fixed(?) a visual error with the currently selected phrase's character going out of bounds when a ん has been hit on mobile devices

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
- I 100% cleared the word catalog, so I went through and edited some words to match how they're spelled in-game
  - bomb ; `みそぎのいたずらグッズ` -> `ミソギのいたずらグッズ`
  - microphone ; `アイドルのひっすあいてむ` -> `アイドルのひっすアイテム`
  - nanaka ; `さいかわ` -> `サイカワ`
  - kaori ; `はいたーい` -> `ハイタ～イ`
  - rin ; `グウタラ` -> `ぐうたら`
  - tomo ; `みくまりゆう` -> `ミクマりゅう`
  - tamaki ; `ねこむすめ` -> `ネコむすめ`
  - tsumugi ; `レイ様ファンクラブ` -> `レイさまファンクラブ`
  - kyaru ; `やばいわよ` -> `ヤバイわよ`
  - This is also probably the last time I'm messing around with the word list.
- Adjusted some button spacing to make it consistent throughout
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