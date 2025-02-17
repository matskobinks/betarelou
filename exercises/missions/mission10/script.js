document.addEventListener('DOMContentLoaded', function() {
      let rows = [];
      
      // Ajouter une ligne
      document.getElementById('addRow').addEventListener('click', function() {
        addRow();
      });
      
      // Calculer le total
      document.getElementById('calculate').addEventListener('click', calculate);
      
      // Remplir automatiquement
      document.getElementById('fillAuto').addEventListener('click', function() {
        fillAutomatically();
      });
      
      function addRow() {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><input type="number" class="quantity" value="1"></td>
          <td><input type="text" class="description"></td>
          <td><input type="number" class="price" step="0.01"></td>
          <td class="total">0.00 €</td>
          <td><button class="removeRow">Supprimer</button></td>
        `;
        
        document.getElementById('tableBody').appendChild(row);
        
        // Ajouter l'événement pour supprimer la ligne
        row.querySelector('.removeRow').addEventListener('click', function() {
          row.remove();
          calculate();
        });
        
        // Mettre à jour le total de la ligne lors d'un changement
        row.querySelector('.quantity').addEventListener('change', updateRowTotal);
        row.querySelector('.price').addEventListener('change', updateRowTotal);
      }
      
      function updateRowTotal(event) {
        const row = event.target.closest('tr');
        const quantity = parseInt(row.querySelector('.quantity').value) || 0;
        const price = parseFloat(row.querySelector('.price').value) || 0;
        const total = quantity * price;
        row.querySelector('.total').textContent = total.toFixed(2) + ' €';
        calculate();
      }
      
      function calculate() {
        let subtotal = 0;
        document.querySelectorAll('#tableBody tr').forEach(row => {
          const total = parseFloat(row.querySelector('.total').textContent.replace(' €', ''));
          subtotal += total;
        });
        
        const discount = subtotal * 0.1;
        const tax = subtotal * 0.2;
        const totalAmount = subtotal - discount + tax;
        
        document.getElementById('subtotal').textContent = subtotal.toFixed(2) + ' €';
        document.getElementById('discount').textContent = discount.toFixed(2) + ' €';
        document.getElementById('tax').textContent = tax.toFixed(2) + ' €';
        document.getElementById('total').textContent = totalAmount.toFixed(2) + ' €';
      }
      
      function fillAutomatically() {
        // Supprimer toutes les lignes existantes
        document.getElementById('tableBody').innerHTML = '';
        
        // Ajouter 3 lignes aléatoires
        for(let i = 0; i < 3; i++) {
          addRow();
          const row = document.querySelector('#tableBody tr:last-child');
          const descriptions = ['Ordinateur portable', 'Smartphone', 'Tablette', 'Écran', 'Clavier'];
          row.querySelector('.description').value = descriptions[Math.floor(Math.random() * descriptions.length)];
          row.querySelector('.quantity').value = Math.floor(Math.random() * 10) + 1;
          row.querySelector('.price').value = (Math.random() * 1000).toFixed(2);
          updateRowTotal({target: row.querySelector('.price')});
        }
      }
      
      // Initialiser avec une ligne par défaut
      addRow();
    });
