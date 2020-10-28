<template>
  <div id="app">
    <h1>Positioning with Gravity</h1>
    <div v-show="url" id="transform">
      <img :src="url" alt="positioning example" />
    </div>

    <b-form @submit="updateImage" class="form-inline">
      <label class="sr-only" for="gravity">Gravity:</label>

      <b-form-select
        id="gravity"
        v-model="gravity"
        :options="compass"
        required
      ></b-form-select>
      <label for="xpos">x:</label>
      <b-form-input
        type="number"
        min="-150"
        max="150"
        step="10"
        id="xpos"
        v-model="xpos"
        placeholder="X position"
      ></b-form-input>

      <label class="mr-sm-2" for="ypos">y:</label>
      <b-form-input
        type="number"
        min="-150"
        max="150"
        step="10"
        id="ypos"
        v-model="ypos"
        placeholder="Y position"
      ></b-form-input>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    <div class="parent">
      <div v-show="url" class="url-display">
        <a :href="url" target="_blank">{{ url }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import cloudinary from 'cloudinary-core'

export default {
  name: 'App',
  created: function() {
    this.cld = cloudinary.Cloudinary.new({ cloud_name: 'cloudinary-training' })
    this.url = this.createUrl()
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    createUrl() {
      const tr = cloudinary.Transformation.new()
      tr.width(250)
        .crop('scale')
        .effect('replace_color:red')
        .border('5px_solid_red')
        .chain()
        .overlay('logo-big')
        .width('50')
        .crop('fit')
        .gravity(this.gravity)
        .x(this.xpos)
        .y(this.ypos)
      console.log(this.cld.url(this.publicId, tr))
      return this.cld.url(this.publicId, tr)
    },
    updateImage(evt) {
      console.log('hi')
      evt.preventDefault()
      this.url = this.createUrl()
      console.log(this.url)

      console.log(`image update:  ${this.gravity} `)
      console.log(`image update:  ${this.xpos} `)
      console.log(`image update:  ${this.ypos} `)
    }
  },
  data: function() {
    return {
      publicId: '1px',
      url: null,
      gravity: 'center',
      cld: undefined,
      xpos: 0,
      ypos: 0,
      compass: [
        'center',
        'north',
        'north_east',
        'east',
        'south_east',
        'south',
        'south_west',
        'west',
        'north_west'
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 4rem;
}

#tranform {
  width: 300;
}

.parent {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
}
.url-display {
  padding: 1rem;

  width: 300px;
  overflow-wrap: break-word;
  background: #f0f0f0;
  border: 1px solid transparent;
}
.url-display a {
  color: #2c3e50;
}
.url-display > div {
  min-width: 0;
}
.form-inline {
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  align-items: center;
}

.form-inline label {
  margin: 0;
  font-size: 1rem;
  color: #0e2f5a;
  font-weight: bold;
}

.form-inline input {
  vertical-align: middle;
  margin: 0;
  /* padding: 0.6rem; */
  background-color: #fff;
  border: 0.3rem solid #ddd;
}

.form-inline button {
  padding: 0.3rem 1.2rem;
  background-color: #0e2f5a;
  border: 1px solid #ddd;
  color: white;
  cursor: pointer;
}
.form-inline button:disabled {
  background-color: gray;
  cursor: none;
}
.form-inline button:hover {
  background-color: royalblue;
}

@media only screen and (min-width: 800px) {
  .form-inline label {
    margin: 0.3rem;
  }
  .form-inline button {
    margin: 0 0 0 0.3rem;
  }
  .form-inline button:disabled {
    background-color: gray;
    cursor: none;
  }

  .form-inline input {
    margin: 0.3rem 0;
  }
}
@media (max-width: 800px) {
  .form-inline {
    flex-direction: column;
    align-items: stretch;
  }
  .form-inline button {
    margin-top: 0.3rem;
  }
  h1 {
    font-size: 1.3rem;
  }
  h2 {
    font-size: 1rem;
  }
  label {
    text-align: left;
  }
}
</style>
