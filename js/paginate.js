
// Grab student list, turn into variable
var studentItems = $('.student-item');
// Insert the search box
var studentSearch ='<div class="student-search"><input id="search" placeholder="Student filter...">';
// Insert the pagination element
var pagination ='<div class="pagination"><ul></ul></div>';

var studentList = pages(studentItems);

// Appends
$('.page-header').append(studentSearch);



// Create an array to hold the student list, then limit 10 per page.
function pages(list) {
	var studentList = list.slice();
	var pagesArray = [];
	while (studentList.length) {
		pagesArray.push(studentList.splice(0,10));
	}
	return pagesArray;
}

// Display the first page with 10 students, hide the rest.
function showPages(pageNumber, pageList) {
  $(".student-list li").hide();
  $.each(pageList, function(index, page){
      if (pageNumber === index) {
        $.each(page, function(i, listItem){
          $(listItem).fadeIn('fast'); // fading was the smoothest way to bring in the list, show/slide looked wonky
        });
      }
  });
}

// Append pagination buttons to page. The number of pages to show is found from pageList.length.
// Add & remove active class on click, and on pageload add active class to first button.
function appendButtons(pageList) {
	$('.page').append(pagination);
	var numPages = pageList.length;
	for (var i = 1; i <= numPages; i++) {
		var buttons = '<li><a href="#">' + i + '</a></li>';
		$('.pagination ul').append(buttons);
	}
	$('.pagination ul li a').first().addClass('active');

	//Add click listeners
	  $(".pagination ul li a").on("click", function(e) {
	    var pageSelection = parseInt($(this)[0].text) - 1;
	    showPages(pageSelection, pageList);
	    $(".pagination ul li a").removeClass();
	    $(this).addClass("active");
	    e.preventDefault();
	  });
}


// Search function finds both name and/or email. If no results are found, change the header H2 to display No Results, otherwise display default Students title. On firing of the searchList, check input value to see if matches, if there are matches, generate the new student array & display appropriate list of buttons.
function searchList() {
    var searchTerm = $('#search').val().toLowerCase().trim();

        var filteredStudents = studentItems.filter(function(i) {
        	var studentEmail = $(this).find('.email').text();
            var studentNames = $(this).find('h3').text();
            if (studentNames.indexOf(searchTerm) > -1 || studentEmail.indexOf(searchTerm) > -1) {
                return true;
            }
            return false;
        });
        if (filteredStudents.length === 0 ) {
        	$('.page-header h2').text('No Results found');
        } else {
        	$('.page-header h2').text('STUDENTS');
        }
        var paginated_students = pages(filteredStudents);
        $('.pagination').remove();
        if (filteredStudents.length >= 10) {
          appendButtons(paginated_students);
        }
        showPages(0, paginated_students);
}

// function executions
appendButtons(studentList);
showPages(0, studentList);

// Event Handlers
$('.student-search').find('button').on('click', searchList);
$('.student-search').find('input').keyup(searchList);
