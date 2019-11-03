const _read_word_list_js = Object.freeze({
    sender_name: 'Word List Reader'
});

// GLOBAL VARIABLES
let word_list = new Map();
let word_list_loaded = false;
const word_list_keys = Object.freeze({
    futsuyomi: 'futsuyomi',
    urayomi: 'urayomi',
    priconneyomi: 'priconneyomi',
});

// RUN AT STARTUP
read_word_list(function () {
    console.log(get_colored_message(_read_word_list_js.sender_name, "Word list loaded!", message_status.SUCCESS));
    word_list_loaded = true;
});

function read_word_list(callback)
{
    const file_path = "/" + window.location.pathname.substring(0, window.location.pathname.indexOf('/')) + window.location.pathname.split('/')[1] + "/data/word_list.json";
    console.log(get_colored_message(_read_word_list_js.sender_name, "Reading ", message_status.INFO) + highlight_code(file_path) + message_status.INFO + "...");

    return $(function () {
        $.ajax({
            'global': false,
            'url': file_path,
            'dataType': "json",
            'success': function (data) {
                $.when(
                    $.each(data, function(word, word_data)
                    {
                        // CONSTRUCT WORD MAP DATA
                        let word_map = new Map();
                        word_map.set(word_list_keys.futsuyomi, word_data[word_list_keys.futsuyomi]);
                        word_map.set(word_list_keys.urayomi, word_data[word_list_keys.urayomi]);
                        word_map.set(word_list_keys.priconneyomi, word_data[word_list_keys.priconneyomi]);

                        // ADD WORD TO WORD LIST
                        word_list.set(word, word_map);
                    })
                ).then(function () {
                    callback();
                });
            }
        });
    });
}