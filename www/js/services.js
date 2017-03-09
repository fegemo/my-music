angular.module('music.services', [])

.service('PlaylistService', function($q, $http) {
  let playlistsCache = null;

  return {
    getPlaylists: function() {
      let deferred = $q.defer();
      if (!playlistsCache) {
        $http.get('http://mah-music-api.herokuapp.com/playlists')
          .success(function(data) {
            playlistsCache = data;
            deferred.resolve(playlistsCache);
          })
          .error(function(err) {
            reject(err);
          });
      } else {
        deferred.resolve(playlistsCache);
      }

      return deferred.promise;
    },

    getPlaylist: function(id) {
      return this.getPlaylists().then(function(playlists) {
        return playlists.filter(function(p) { return p._id === id })[0] || null;
      });
    }
  }
});
