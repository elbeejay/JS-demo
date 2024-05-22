import getEmailList1 from './emailList1.js';
import getEmailList2 from './emailList2.js';

const emailForm = document.getElementById('email-form');
const selectedEmailsDiv = document.getElementById('selected-emails');
let selectedEmailLists = []; // Internal state to track selected lists

function updateSelectedEmails() {
  selectedEmailLists = []; // Reset selectedEmailLists before updating
  const checkedBoxes = document.querySelectorAll('input[name="email-list"]:checked');

  checkedBoxes.forEach(checkbox => {
    selectedEmailLists.push(checkbox.value);
  });

  // Clear previously displayed emails
  selectedEmailsDiv.textContent = '';
  const allEmails = [];
  selectedEmailLists.forEach(listName => {
    // Access function by name based on listName
    let emailList;
    if (listName === 'list1') {
      emailList = getEmailList1();
    } else if (listName === 'list2') {
      emailList = getEmailList2();
    } else {
      // Handle unexpected list names (optional)
      console.error('Unknown list name:', listName);
    }
    allEmails.push(...emailList);

    // Append email list content with newline
    // selectedEmailsDiv.textContent += emailList.join('; ') + '; ';
  });

  const uniqueEmails = new Set(allEmails)
  // Display unique emails with double newline separation
  uniqueEmails.forEach(email => {
    selectedEmailsDiv.textContent += email + '; ';
  });
}

emailForm.addEventListener('change', updateSelectedEmails);

// Call updateSelectedEmails initially to reflect pre-checked checkboxes (optional)
updateSelectedEmails();


const copyButton = document.getElementById('copy-button');

copyButton.addEventListener('click', () => {
  const selectedEmailsText = document.getElementById('selected-emails').textContent;
  const textArea = document.createElement('textarea');
  textArea.value = selectedEmailsText;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    console.log('Emails copied to clipboard (fallback)');
  } catch (err) {
    console.error('Failed to copy emails (fallback):', err);
  } finally {
    document.body.removeChild(textArea);
  }
});
