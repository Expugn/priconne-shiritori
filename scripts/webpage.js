function open_word_list()
{
    document.getElementById("game-div").hidden = true;
    document.getElementById("word-list-div").hidden = false;
}

function close_word_list()
{
    document.getElementById("game-div").hidden = false;
    document.getElementById("word-list-div").hidden = true;
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
}