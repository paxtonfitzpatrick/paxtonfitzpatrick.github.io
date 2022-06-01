source 'https://rubygems.org'

# programmatically get version of github-pages gem (and all dependencies) used 
# in deployment so local dev environment always matches production environment
require 'json'
require 'open-uri'
versions = JSON.parse(URI.open('https://pages.github.com/versions.json').read)

gem 'github-pages', versions['github-pages']
