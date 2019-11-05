function open_word_list()
{
    document.getElementById("game-div").hidden = true;
    document.getElementById("word-list-div").hidden = false;
}

function close_word_list()
{
    document.getElementById("game-div").hidden = false;
    document.getElementById("word-list-div").hidden = true;

    if (shiritori_game.turn_count === 0 && shiritori_game.unsaved_changes)
    {
        build_all_choices();
        shiritori_game.unsaved_changes = false;
    }
}

function show_tips()
{
    document.getElementById("game-div").hidden = true;
    document.getElementById("tips-div").hidden = false;
}

function hide_tips()
{
    document.getElementById("game-div").hidden = false;
    document.getElementById("tips-div").hidden = true;
}

function toggle_word_search()
{
    document.getElementById("word-list-div").hidden = !document.getElementById("word-list-div").hidden;
    document.getElementById("word-search-div").hidden = !document.getElementById("word-search-div").hidden;

    if (!document.getElementById("word-search-div").hidden)
    {
        if (document.getElementById("low-opacity-word-search-checkbox").checked)
        {
            // REFRESH PHRASE LIST IF LOW OPACITY WORD SEARCH IS CHECKED
            build_phrase_list();
        }
    }
}