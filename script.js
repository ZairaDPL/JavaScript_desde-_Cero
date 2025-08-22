document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const commentForm = document.getElementById('commentForm');
    const commentInput = document.getElementById('commentInput');
    const commentsContainer = document.getElementById('commentsContainer');
    const noComments = document.getElementById('noComments');
    
    // Array para almacenar comentarios (en una aplicación real, vendrían de una base de datos)
    let comments = [];
    
    // Función para agregar un comentario
    function addComment(commentText) {
        const comment = {
            text: commentText,
            date: new Date(),
            id: Date.now() // Usamos el timestamp como ID único
        };
        
        comments.push(comment);
        renderComments();
    }

    // Función para eliminar un comentario
    function deleteComment(id) {
        comments = comments.filter(comment => comment.id !== id);
        renderComments();
    }
    
    // Función para renderizar los comentarios
    function renderComments() {
        // Limpiar el contenedor de comentarios
        commentsContainer.innerHTML = '';
        
        // Mostrar mensaje si no hay comentarios
        if (comments.length === 0) {
            commentsContainer.appendChild(noComments);
            noComments.style.display = 'block';
            return;
        }
        
        noComments.style.display = 'none';
        
        // Crear elementos para cada comentario
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            
            const commentText = document.createElement('p');
            commentText.classList.add('comment-text');
            commentText.textContent = comment.text;

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-btn');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', () => deleteComment(comment.id));
            
            commentElement.appendChild(commentText);
            commentElement.appendChild(deleteButton);
            
            commentsContainer.appendChild(commentElement);
        });
    }
    
    // Manejar el envío del formulario
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const commentText = commentInput.value.trim();
        
        if (commentText) {
            addComment(commentText);
            commentInput.value = '';
            commentInput.focus();
        }
    });
    
    // Renderizar comentarios iniciales (si los hubiera)
    renderComments();
});