<script>
    export let checked = false;
    export let names ={on:"on",off:"off"};
  </script>
  
  <style>
  .toggle {
  overflow: hidden;
  display: inline-block;
  width: 8em;
  background: #d9e4e8;
  padding: 0.125em;
  cursor: pointer;
  }
  .toggle input {
    position: absolute;
    visibility: hidden;
    }
  .toggle span {
    position: relative;
    left: 0%;
    display: block;
    text-transform: uppercase;
    text-align: center;
    /**
     * Holo doesn't have any transition, but
     * it's added here for demo purposes
     */
    -webkit-transition: left 200ms ease-out;
       -moz-transition: left 200ms ease-out;
         -o-transition: left 200ms ease-out;
            transition: left 200ms ease-out;
    }
    .toggle :checked + span {
      left: 50%;
      }

  /* Default unchecked state */
  .toggle span:before {
    content: attr(data-unchecked);
    display: block;
    width: 50%;
    background-color: #0275d8;
    border-radius: 0.15em;
    box-shadow: inset 0 0.1em 0 rgba(255, 255, 255, 0.3);
    color: white;
    }

  /* Checked state */
  .toggle :checked + span:before {
    content: attr(data-checked);
    background-color: #5cb85c;
    }

  </style>
  
  
  <label class="toggle">
    <input type="checkbox" bind:checked>
    <span data-unchecked={names.off} data-checked={names.on}></span>
  </label>