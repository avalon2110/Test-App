$(document).ready(function(){
  $('#delete_btn').on('click', function(e){
    const title = document.getElementById('delete_title').value;

    $.ajax({
      type: 'DELETE',
      url: '/delete/'+title,
      success: function (res) {
        alert('Deleted Company');
        window.location.href='/app';
      },
      error: function(err){
        console.log(err);
      }
    });
  });


  $('#view_btn').on('click', function(e){
    const title = document.getElementById('get_title').value;

    $.ajax({
      type: 'GET',
      url: '/get/'+title,
      success: function (data) {
        alert(JSON.stringify(data));
        window.location.href='/app';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});
