source 'https://rubygems.org'

# programmatically get version of github-pages gem (and all dependencies) used 
# in deployment so local dev environment always matches production environment
require 'json'
require 'open-uri'
versions = JSON.parse((URI('https://pages.github.com/versions.json').open).read)

gem 'github-pages', versions['github-pages'], group: :jekyll_plugins
