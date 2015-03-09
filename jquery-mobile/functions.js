function get_register_form(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost/laravel/users/api_loggedin_key',
        async: false,
        jsonpCallback: 'jsonCallbackExpenditures',
        contentType: "application/javascript",
        dataType: 'jsonp',
        success: function(loggedin_key) {
            $('input[name=loggedin_key]').val(loggedin_key);
        },
        error: function(e) {
            $('input[name=loggedin_key]').val(loggedin_key);
        }
    });
}

function get_loggedin_key(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost/laravel/users/api_loggedin_key',
        async: false,
        jsonpCallback: 'jsonCallbackExpenditures',
        contentType: "application/javascript",
        dataType: 'jsonp',
        success: function(loggedin_key) {
            $('input[name=loggedin_key]').val(loggedin_key);
        },
        error: function(e) {
            $('input[name=loggedin_key]').val(loggedin_key);
        }
    });
}

function get_expenditures(){
    
    var $transaction_type_arr = {
        'took_loan_from' : 'I Took Loan From',
        'gave_loan_to' : 'I Gave Loan To', 
        'initial_amount' : 'Initial Amount',
        'spent_cash_on' : 'I Spent cash on', 
        'got_pay' : 'I Got Pay',
    };

    $.ajax({
        type: 'GET',
        url: 'http://localhost/laravel/expenditures/api_index',
        async: false,
        jsonpCallback: 'jsonCallbackExpenditures',
        contentType: "application/javascript",
        dataType: 'jsonp',
        data: {
            key : usr
        },
        success: function(expenditures) {
            var html =
            '<table>'+
                '<thead>'+
                '<tr>'+
                    '<th>Transaction</th>'+
                    '<th>Amount(Rs)</th>'+
                    '<th>Bank Amount(Rs)</th>'+
                    '<th>Dated</th>'+
                    '<th>Control</th>'+
                '</tr>'+
                '</thead>'+
                '<tbody>';

            // '<ul data-role="listview" data-theme="c">';
            $.each(expenditures, function(i,expenditure){
                
                // html += '<li><button class="edit_expenditures" id="'+item.id+'">I '+item.transaction_type+'</button></li>';
                if (expenditure.name == null) {
                    expenditure.name = '';
                }

                if (expenditure.e_desc == null) {
                    expenditure.e_desc = '';
                }

                html +=
                '<tr>'+
                    '<td>'+$transaction_type_arr[expenditure.transaction_type] + ' ' + expenditure.name + ' ' + expenditure.e_desc + ' </td>'+
                    '<td>'+Math.abs(expenditure.e_amount)+'</td>'+
                    '<td>'+expenditure.bank_amount+'</td>'+
                    '<td>'+expenditure.date_created+'</td>'+
                    '<td><a title="Delete Expenditure" onclick="return confirm(\'Are you sure?\')" href="http://localhost/laravel/expenditures/delete/'+expenditure.id+'" class="btn btn-xs btn-danger">del</a></td>'+
                '</tr>';
            });

            html +=
                '</tbody>'+
            '</table>';
            html +=
            '<div data-role="popup" id="add_expenditure_popup">'+
                '<p>Added Succefully.</p>'+
            '</div>';

            $("#add_expenditure_popup").popup("open");
            
            // html += '</ul>';
            
            $('div#expenditures div[data-role=content]').html(html);
            expenditures_count = 1;
        },
        error: function(e) {
            expenditures_count = 0;
        }
    });
}

function get_collaborators(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost/laravel/collaborators/api_index',
        async: false,
        jsonpCallback: 'jsonCallbackCollaborators',
        contentType: "application/javascript",
        dataType: 'jsonp',
        data: {
            key : usr
        },
        success: function(res) {
            var collaborators = res.collaborators;
            var html =
            '<table>'+
                '<thead>'+
                '<tr>'+
                    '<th>Name</th>'+
                    '<th>Who is</th>'+
                    '<th>Amount(Rs)</th>'+
                    '<th>Control</th>'+
                '</tr>'+
                '</thead>'+
                '<tbody>';



            // '<ul data-role="listview" data-theme="c">';
            $.each(collaborators, function(i,collaborator){
                // alert(item.label)
                // html += '<li><button class="edit_collaborators" id="'+item.id+'">I '+item.transaction_type+'</button></li>';
                html +=
                '<tr>'+
                    '<td>I '+collaborator.name+'</td>'+
                    '<td>'+collaborator.description+'</td>'+
                    '<td>'+Math.abs(collaborator.amount)+'</td>'+
                    '<td><a title="Delete collaborator" onclick="return confirm(\'Are you sure?\')" href="http://localhost/laravel/collaborators/delete/'+collaborator.id+'" class="btn btn-xs btn-danger">del</a></td>'+
                '</tr>';
            });

            html +=
                '</tbody>'+
            '</table>';

            // html += '</ul>';
            
            $('div#collaborators div[data-role=content]').append(html);
            collaborators_count = 1;
        },
        error: function(e) {
            collaborators_count = 0;
        }
    });
}

function apiPostSave(){
    alert('fdsafa');
    return false;
}

function get_user(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost/laravel/users/api_save',
        async: false,
        jsonpCallback: 'jsonCallbackUserInfo',
        contentType: "application/javascript",
        dataType: 'jsonp',
        data: {
            key : usr
        },
        success: function(user) {
            var html =
            '<form method="POST" id="form_user" onsubmit="javascript:return return false;" accept-charset="UTF-8">'+
                '<input name="_token" type="hidden" value="DO8gapU60kAbK48G2khdr59A3gSMl0bhFiWw2i3h">'+
                '<input id="id" name="id" type="hidden" value="'+usr+'">'+
                
                '<label for="firstname">Firstname : </label>'+
                '<input name="firstname" type="text" id="firstname" value="'+user.first_name+'">'+

                '<label for="lastname">Lastname : </label>'+
                '<input name="lastname" type="text" id="lastname" value="'+user.last_name+'">'+

                '<label for="address">Address : </label>'+
                '<textarea name="address" cols="50" rows="10" id="address">'+user.address+'</textarea>'+

                '<input class="btn btn-success" type="submit" value="Update" id="user_update" name="Update">'+
            '</form>';

            $('div#update_info div[data-role=content]').append(html);

            var html =
            '<form method="POST" action="http://localhost/laravel/collaborators/post_save" accept-charset="UTF-8">'+
                '<label for="username">username : </label>'+
                '<input name="username" type="text" id="username" value="'+user.username+'">'+
                
                '<input class="btn btn-success" type="submit" value="Update">'+
            '</form>';

            $('div#change_username div[data-role=content]').append(html);

            var html =
            '<form method="POST" action="http://localhost/laravel/collaborators/post_save" accept-charset="UTF-8">'+
                '<label for="email_address">Email Address : </label>'+
                '<input name="email_address" type="text" id="email_address" value="'+user.email_address+'">'+

                '<input class="btn btn-success" type="submit" value="Update">'+       
            '</form>';

            $('div#change_email_address div[data-role=content]').append(html);
        },
        error: function(e) {
            var html = "Unable to load form";
            $('div#change_username div[data-role=content]').append(html);
        }
    });
}
