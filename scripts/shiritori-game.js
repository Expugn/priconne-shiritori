let shiritori_game = {
    sender_name: "Shiritori",
    localstorage_location: "collection",
    rush_mode: false,
    collected_words: [],

    max_words_per_row: 10,


    futsuyomi_collected_phrases: 0,
    urayomi_collected_phrases: 0,
    priconneyomi_collected_phrases: 0,

    futsuyomi_total_phrases: 0,
    urayomi_total_phrases: 0,
    priconneyomi_total_phrases: 0,

    turn_count: 0,
};

function shiritori(word_id, phrase, phrase_type)
{
    console.log(get_colored_message(shiritori_game.sender_name, "Selected " + highlight_code(word_id) + " ; " + highlight_code(phrase) + " ; " + highlight_code(phrase_type), message_status.INFO));

    // GAME STARTING?
    if (shiritori_game.turn_count === 0)
    {
        shiritori_game.turn_count++;
        document.getElementById("turn-counter").innerHTML = shiritori_game.turn_count;
        document.getElementById("turn-text").hidden = false;
        document.getElementById("game-start-tip").hidden = true;
        document.getElementById("your-turn-text").hidden = false;
    }
    else
    {
        if (!shiritori_game.rush_mode)
        {
            if (!document.getElementById("your-turn-text").hidden)
            {
                // YOUR TURN HAS JUST PASSED
                document.getElementById("your-turn-text").hidden = true;
                document.getElementById("opponent-turn-text").hidden = false;
                document.getElementById("rush-mode-button-text").hidden = false;
            }
            else
            {
                // KAYA'S TURN HAS JUST PASSED
                document.getElementById("your-turn-text").hidden = false;
                document.getElementById("opponent-turn-text").hidden = true;
                document.getElementById("rush-mode-button-text").hidden = true;

                // INCREASE TURN COUNTER
                shiritori_game.turn_count++;
                document.getElementById("turn-counter").innerHTML = shiritori_game.turn_count;
            }
        }
    }
    // ADD WORD TO COLLECTION
    add_word_to_collection(word_id, phrase, phrase_type);

    // BUILD NEW LIST OF POSSIBLE WORDS
    get_possible_words(phrase);
}

function add_word_to_collection(word_id, phrase, phrase_type)
{
    let word = word_id + ";" + phrase + ";" + phrase_type;

    // CHECK IF WORD EXISTS IN COLLECTION
    if (!shiritori_game.collected_words.includes(word))
    {
        console.log(get_colored_message(shiritori_game.sender_name, "New word collected: " + highlight_code(word), message_status.SUCCESS));

        if (!document.getElementById(word_id + "-" + phrase).classList.contains("low-opacity"))
        {
            document.getElementById(word_id + "-" + phrase).classList.add("low-opacity");
        }
        switch (phrase_type)
        {
            case word_list_keys.futsuyomi:
                shiritori_game.futsuyomi_collected_phrases++;
                document.getElementById("futsuyomi-count").innerHTML = shiritori_game.futsuyomi_collected_phrases;
                break;
            case word_list_keys.urayomi:
                shiritori_game.urayomi_collected_phrases++;
                document.getElementById("urayomi-count").innerHTML = shiritori_game.urayomi_collected_phrases;
                break;
            case word_list_keys.priconneyomi:
                shiritori_game.priconneyomi_collected_phrases++;
                document.getElementById("priconneyomi-count").innerHTML = shiritori_game.priconneyomi_collected_phrases;
                break;
            default:
                // IGNORED
                break;
        }

        // ADD WORD TO COLLECTION
        shiritori_game.collected_words.push(word);

        // SAVE DATA
        localStorage.setItem(shiritori_game.localstorage_location, JSON.stringify(shiritori_game.collected_words));

        // CHECK IF COMPLETE OR NOT
        check_if_word_complete(word_id);
    }
}

function remove_word_from_collection(word_id, phrase, phrase_type)
{
    let word = word_id + ";" + phrase + ";" + phrase_type;

    // CHECK IF WORD EXISTS IN COLLECTION
    if (shiritori_game.collected_words.includes(word))
    {
        console.log(get_colored_message(shiritori_game.sender_name, "Word removed: " + highlight_code(word), message_status.WARNING));

        if (document.getElementById(word_id + "-" + phrase).classList.contains("low-opacity"))
        {
            document.getElementById(word_id + "-" + phrase).classList.remove("low-opacity");
        }
        switch (phrase_type)
        {
            case word_list_keys.futsuyomi:
                shiritori_game.futsuyomi_collected_phrases--;
                document.getElementById("futsuyomi-count").innerHTML = shiritori_game.futsuyomi_collected_phrases;
                break;
            case word_list_keys.urayomi:
                shiritori_game.urayomi_collected_phrases--;
                document.getElementById("urayomi-count").innerHTML = shiritori_game.urayomi_collected_phrases;
                break;
            case word_list_keys.priconneyomi:
                shiritori_game.priconneyomi_collected_phrases--;
                document.getElementById("priconneyomi-count").innerHTML = shiritori_game.priconneyomi_collected_phrases;
                break;
            default:
                // IGNORED
                break;
        }

        // REMOVE WORD FROM COLLECTION
        let word_index = shiritori_game.collected_words.indexOf(word);
        if (word_index > -1)
        {
            shiritori_game.collected_words.splice(word_index, 1);
        }

        // SAVE DATA
        if (shiritori_game.collected_words.length > 0)
        {
            localStorage.setItem(shiritori_game.localstorage_location, JSON.stringify(shiritori_game.collected_words));
        }
        else
        {
            // COLLECTION IS EMPTY, DELETE SAVED DATA.
            if (localStorage.getItem(shiritori_game.localstorage_location) !== null)
            {
                localStorage.removeItem(shiritori_game.localstorage_location);
            }
        }

        // CHECK IF COMPLETE OR NOT
        check_if_word_complete(word_id);
    }
}

function get_possible_words(phrase)
{
    // NOTE THAT THIS IS IN HIRAGANA, KATAKANA CHARACTERS MUST BE CHECKED AS WELL
    let end_character = get_last_character(phrase);
    let table_html = "";
    let counter = 0;

    // FIRST CHARACTER OF A PHRASE THAT MATCHES IN HIRAGANA OR KATAKANA = POSSIBLE
    for (let [word_id, word_data] of word_list)
    {
        let possible_words = [];
        // COLLECT POSSIBLE PHRASES FROM WORD
        for (let i = 0 ; i < word_data.get(word_list_keys.futsuyomi).length ; i++)
        {
            let first_character = word_data.get(word_list_keys.futsuyomi)[i][0];
            if (end_character === first_character ||
                wanakana.toKatakana(end_character) === first_character)
            {
                possible_words.push({ [word_data.get(word_list_keys.futsuyomi)[i]] : word_list_keys.futsuyomi });
            }
        }
        for (let i = 0 ; i < word_data.get(word_list_keys.urayomi).length ; i++)
        {
            let first_character = word_data.get(word_list_keys.urayomi)[i][0];
            if (end_character === first_character ||
                wanakana.toKatakana(end_character) === first_character)
            {
                possible_words.push({ [word_data.get(word_list_keys.urayomi)[i]] : word_list_keys.urayomi });
            }
        }
        for (let i = 0 ; i < word_data.get(word_list_keys.priconneyomi).length ; i++)
        {
            let first_character = word_data.get(word_list_keys.priconneyomi)[i][0];
            if (end_character === first_character ||
                wanakana.toKatakana(end_character) === first_character)
            {
                possible_words.push({ [word_data.get(word_list_keys.priconneyomi)[i]] : word_list_keys.priconneyomi });
            }
        }

        // DISPLAY POSSIBLE RESULTS
        for (let i = 0 ; i < possible_words.length ; i++)
        {
            // (word_id, {phrase : phrase_type})
            // phrase_type = futsuyomi | urayomi | priconneyomi ; determine color of character
            add_word_to_table_html(word_id, possible_words[i]);
        }
    }
    // CLOSE TABLE
    table_html += "</tr></tbody>";
    document.getElementById("selection-table").innerHTML = table_html;

    // POSSIBLE WORD COUNT = 0? A ん WAS PROBABLY HIT
    if (counter === 0)
    {
        document.getElementById("n-character-hit-text").hidden = false;
        console.log(get_colored_message(shiritori_game.sender_name, highlight_code("ん") + " was hit! Game Over!", message_status.INFO));
    }

    function add_word_to_table_html(word_id, phrase_data)
    {
        // ADD TABLE ROW IF FIRST WORD
        if (counter === 0)
        {
            table_html += "<tr class='border'>";
        }

        // CLOSE TABLE ROW AND START NEW IF LIMIT HAS BEEN REACHED
        if (counter % shiritori_game.max_words_per_row === 0 && counter !== 0)
        {
            table_html += "</tr><tr>";
        }

        let phrase = Object.keys(phrase_data)[0];
        let phrase_type = phrase_data[phrase];
        let is_word_already_collected = shiritori_game.collected_words.includes(word_id + ";" + phrase + ";" + phrase_type);

        // INSERT DATA
        table_html += "<th class='word-image'>";
        table_html += "<button id='" + word_id + "_" + phrase + "' class='pointer-cursor word-selection-button" + (is_word_already_collected ? " low-opacity" : "") + "' onclick='shiritori(\"" + word_id + "\", \"" + phrase + "\", \"" + phrase_type + "\")'>";
        table_html += "<img class='notranslate word-image' title='" + phrase + "' src='images/game/" + word_id + ".png' alt=''>";
        table_html += "<img class='notranslate character-circle' src='images/webpage/" + "character_circle" + ".png' alt=''>";
        table_html += "<div class='notranslate end-character webpage-text " + phrase_type + "'>" + get_last_character(phrase) + "</div>";
        table_html += "</button></th>";

        counter++;
    }
}

function reset_game()
{
    shiritori_game.rush_mode = false;
    if (!document.getElementById("rush-mode-button").classList.contains("low-opacity"))
    {
        document.getElementById("rush-mode-button").classList.toggle("low-opacity");
    }
    shiritori_game.turn_count = 0;
    document.getElementById("turn-text").hidden = true;
    document.getElementById("game-start-tip").hidden = false;
    document.getElementById("your-turn-text").hidden = true;
    document.getElementById("opponent-turn-text").hidden = true;
    document.getElementById("rush-mode-button-text").hidden = true;
    document.getElementById("rush-mode-text").hidden = true;
    document.getElementById("n-character-hit-text").hidden = true;

    build_all_choices();
}

function print_word_list()
{
    let phrase_counter = 0;
    let futsuyomi_counter = 0;
    let urayomi_counter = 0;
    let priconneyomi_counter = 0;

    console.log("word list size: " + highlight_code(word_list.size));
    for (let [word_id, word_data] of word_list)
    {
        console.log(highlight_code("word id") + ": " + highlight(word_id));
        if (word_data.get(word_list_keys.futsuyomi).length > 0)
        {
            console.log("\t" + highlight_code(word_list_keys.futsuyomi) + ":");
            for (let i = 0 ; i < word_data.get(word_list_keys.futsuyomi).length ; i++)
            {
                console.log("\t\t" + color_text(word_data.get(word_list_keys.futsuyomi)[i], console_colors.GREEN));
                phrase_counter++;
                futsuyomi_counter++;
            }
        }
        if (word_data.get(word_list_keys.urayomi).length > 0)
        {
            console.log("\t" + highlight_code(word_list_keys.urayomi) + ":");
            for (let i = 0 ; i < word_data.get(word_list_keys.urayomi).length ; i++)
            {
                console.log("\t\t" + color_text(word_data.get(word_list_keys.urayomi)[i], console_colors.CYAN));
                phrase_counter++;
                urayomi_counter++;
            }
        }
        if (word_data.get(word_list_keys.priconneyomi).length > 0)
        {
            console.log("\t" + highlight_code(word_list_keys.priconneyomi) + ":");
            for (let i = 0 ; i < word_data.get(word_list_keys.priconneyomi).length ; i++)
            {
                console.log("\t\t" + color_text(word_data.get(word_list_keys.priconneyomi)[i], console_colors.MAGENTA));
                phrase_counter++;
                priconneyomi_counter++;
            }
        }
    }
    console.log(highlight_code(phrase_counter) + " phrases counted.");
    console.log(highlight(word_list_keys.futsuyomi) + ": " + highlight_code(futsuyomi_counter));
    console.log(highlight(word_list_keys.urayomi) + ": " + highlight_code(urayomi_counter));
    console.log(highlight(word_list_keys.priconneyomi) + ": " + highlight_code(priconneyomi_counter));
}

function build_all_choices()
{
    let table_html = "";
    let counter = 0;

    for (let [word_id, word_data] of word_list)
    {
        // COLLECT POSSIBLE PHRASES FROM WORD
        let words = [];
        for (let i = 0 ; i < word_data.get(word_list_keys.futsuyomi).length ; i++)
        {
            words.push({ [word_data.get(word_list_keys.futsuyomi)[i]] : word_list_keys.futsuyomi });
        }
        for (let i = 0 ; i < word_data.get(word_list_keys.urayomi).length ; i++)
        {
            words.push({ [word_data.get(word_list_keys.urayomi)[i]] : word_list_keys.urayomi });
        }
        for (let i = 0 ; i < word_data.get(word_list_keys.priconneyomi).length ; i++)
        {
            words.push({ [word_data.get(word_list_keys.priconneyomi)[i]] : word_list_keys.priconneyomi });
        }

        for (let i = 0 ; i < words.length ; i++)
        {
            // (word_id, {phrase : phrase_type})
            // phrase_type = futsuyomi | urayomi | priconneyomi ; determine color of character
            add_word_to_table_html(word_id, words[i]);
        }
    }
    // CLOSE TABLE
    table_html += "</tr></tbody>";
    document.getElementById("selection-table").innerHTML = table_html;

    function add_word_to_table_html(word_id, phrase_data)
    {
        // ADD TABLE ROW IF FIRST WORD
        if (counter === 0)
        {
            table_html += "<tr class='border'>";
        }

        // CLOSE TABLE ROW AND START NEW IF LIMIT HAS BEEN REACHED
        if (counter % shiritori_game.max_words_per_row === 0 && counter !== 0)
        {
            table_html += "</tr><tr>";
        }

        let phrase = Object.keys(phrase_data)[0];
        let phrase_type = phrase_data[phrase];
        let is_word_already_collected = shiritori_game.collected_words.includes(word_id + ";" + phrase + ";" + phrase_type);

        // INSERT DATA
        table_html += "<th class='word-image'>";
        table_html += "<button id='" + word_id + "_" + phrase + "' class='pointer-cursor word-selection-button" + (is_word_already_collected ? " low-opacity" : "") + "' onclick='shiritori(\"" + word_id + "\", \"" + phrase + "\", \"" + phrase_type + "\")'>";
        table_html += "<img class='notranslate word-image' title='" + phrase + "' src='images/game/" + word_id + ".png' alt=''>";
        table_html += "<img class='notranslate character-circle' src='images/webpage/" + "character_circle" + ".png' alt=''>";
        table_html += "<div class='notranslate end-character webpage-text " + phrase_type + "'>" + get_last_character(phrase) + "</div>";
        table_html += "</button></th>";

        counter++;
    }
}

function get_last_character(phrase)
{
    return wanakana.toHiragana(phrase[phrase.length - 1] === "ー" ? phrase[phrase.length - 2] : phrase[phrase.length - 1]);
}

function toggle_rush_mode()
{
    shiritori_game.rush_mode = !shiritori_game.rush_mode;
    document.getElementById("rush-mode-button").classList.toggle("low-opacity");
    console.log(get_colored_message(shiritori_game.sender_name, "Rush Mode = " + shiritori_game.rush_mode, message_status.INFO));

    if (shiritori_game.rush_mode)
    {
        document.getElementById("opponent-turn-text").hidden = true;
        document.getElementById("rush-mode-text").hidden = false;
    }
    else
    {
        document.getElementById("opponent-turn-text").hidden = false;
        document.getElementById("rush-mode-text").hidden = true;
    }
}

function build_word_list()
{
    let html = "";
    for (let [word_id, word_data] of word_list)
    {
        let futsuyomi_array = word_data.get(word_list_keys.futsuyomi);
        let urayomi_array = word_data.get(word_list_keys.urayomi);
        let priconneyomi_array = word_data.get(word_list_keys.priconneyomi);

        // ADD AMOUNT TO TOTAL
        shiritori_game.futsuyomi_total_phrases += futsuyomi_array.length;
        shiritori_game.urayomi_total_phrases += urayomi_array.length;
        shiritori_game.priconneyomi_total_phrases += priconneyomi_array.length;

        // WORD IMAGE
        html += "<img class='word-list-image' title='" + word_id + "' src='images/game/" + word_id + ".png' alt=''>";

        // DIVIDER
        html += "<img class='divider' src='' alt=''>";

        // COMPLETE IMAGE/TEXT
        html += "<img id='" + word_id + "-complete' class='complete' src='images/webpage/" + "complete" + ".png' alt='' hidden>";

        // FUTSUYOMI PHRASES
        if (futsuyomi_array.length > 0)
        {
            html += "<br>";
            for (let i = 0 ; i < futsuyomi_array.length ; i++)
            {
                html += "<button id='" + word_id + "-" + futsuyomi_array[i] + "' onclick='toggle_phrase(\"" + word_id + "\", \"" + futsuyomi_array[i] + "\", \"futsuyomi\");'>";
                html += "<div class='futsuyomi word-list-text' style='font-weight: bolder'>" + futsuyomi_array[i] + "</div>";
                html += "</button><br>";
            }
        }

        // URAYOMI PHRASES
        if (urayomi_array.length > 0)
        {
            for (let i = 0 ; i < urayomi_array.length ; i++)
            {
                html += "<button id='" + word_id + "-" + urayomi_array[i] + "' onclick='toggle_phrase(\"" + word_id + "\", \"" + urayomi_array[i] + "\", \"urayomi\")'>";
                html += "<div class='urayomi word-list-text' style='font-weight: bolder'>" + urayomi_array[i] + "</div>";
                html += "</button><br>";
            }
        }

        // PRICONNEYOMI PHRASES
        if (priconneyomi_array.length > 0)
        {
            for (let i = 0 ; i < priconneyomi_array.length ; i++)
            {
                html += "<button id='" + word_id + "-" + priconneyomi_array[i] + "' onclick='toggle_phrase(\"" + word_id + "\", \"" + priconneyomi_array[i] + "\", \"priconneyomi\")'>";
                html += "<div class='priconneyomi word-list-text' style='font-weight: bolder'>" + priconneyomi_array[i] + "</div>";
                html += "</button><br>";
            }
            html += "<br>";
        }
        html += "</tbody></table><br><br><br>";
    }
    document.getElementById("word-list").innerHTML = html;

    // SET TOTAL PHRASES
    document.getElementById("futsuyomi-total-count").innerHTML = shiritori_game.futsuyomi_total_phrases;
    document.getElementById("urayomi-total-count").innerHTML = shiritori_game.urayomi_total_phrases;
    document.getElementById("priconneyomi-total-count").innerHTML = shiritori_game.priconneyomi_total_phrases;
}

function toggle_phrase(word_id, phrase, phrase_type)
{
    let word = word_id + ";" + phrase + ";" + phrase_type;
    if (shiritori_game.collected_words.includes(word))
    {
        remove_word_from_collection(word_id, phrase, phrase_type);
    }
    else
    {
        add_word_to_collection(word_id, phrase, phrase_type);
    }

    if (shiritori_game.turn_count === 0)
    {
        build_all_choices();
    }
}

function check_if_word_complete(word_id)
{
    let word_data = word_list.get(word_id);
    let merged_array = [...word_data.get(word_list_keys.futsuyomi), ...word_data.get(word_list_keys.urayomi), ...word_data.get(word_list_keys.priconneyomi)];

    for (let i = 0 ; i < merged_array.length ; i++)
    {
        if (!document.getElementById(word_id + "-" + merged_array[i]).classList.contains("low-opacity"))
        {
            document.getElementById(word_id + "-complete").hidden = true;
            return false;
        }
    }
    document.getElementById(word_id + "-complete").hidden = false;
    return true;
}

function reset_data()
{
    if (localStorage.getItem(shiritori_game.localstorage_location) !== null)
    {
        if (window.confirm("Are you sure you want to reset your data?\nYOUR COLLECTION WILL BE LOST."))
        {
            localStorage.removeItem(shiritori_game.localstorage_location);
            location.reload();
        }
    }
}