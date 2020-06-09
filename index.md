---
layout: home
header:
  title: Paxton Fitzpatrick
  image: assets/img/brain-medium.png
  icons:
    - title: Email
      icon: fa-envelope
      icon_type: fa
      url: mailto:Paxton.C.Fitzpatrick@Dartmouth.edu
    - title: GitHub
      icon: fa-github
      icon_type: fab
      url: https://github.com/paxtonfitzpatrick
    - title: LinkedIn
      icon: fa-linkedin-in
      icon_type: fab
      url: https://www.linkedin.com/in/paxton-fitzpatrick-962500132
    - title: Twitter
      icon: fa-twitter
      icon_type: fab
      url: https://twitter.com/paxt0n4
    - title: CV
      icon: fa-file-alt
      icon_type: fa
      url: '#'
    - title: CDL
      icon: cdl-logo
      icon_type: custom
      url: https://www.context-lab.com/


sections:
  - type: multipane.html
    section_id: about
    background_style: bg-secondary
    title: About me
    before_text: TEST MULTIPANE BEFORE TEXT
    after_text: TEST MULTIPANE AFTER TEXT
    panes:
      - type: skills.html
        before_text: TEST PANE BEFORE TEXT
        after_text: TEST PANE AFTER TEXT
        title: Skills
        skills:
          - image: python.png
            caption: Python
          - image: conda.png
            caption: Conda
          - image: numpy.png
            caption: NumPy
          - image: pandas.png
            caption: Pandas
          - image: scikit-learn.png
            caption: Scikit-learn
          - image: matplotlib.png
            caption: Matplotlib
          - image: seaborn.png
            caption: Seaborn
          - image: psychopy.png
            caption: PsychoPy
          - image: jupyter.png
            caption: Jupyter
          - image: git.png
            caption: Git/GitHub
          - image: html.png
            caption: HTML
          - image: css.png
            caption: CSS
          - image: javascript.png
            caption: JavaScript
          - image: jspsych.png
            caption: jsPsych
          - image: psiturk.png
            caption: psiTurk
          - image: docker.png
            caption: Docker
          - image: travis.png
            caption: Travis CI
          - image: shell.png
            caption: Shell
          - image: latex.png
            caption: LaTeX
          - image: supercollider.png
            caption: SuperCollider
          - image: illustrator.png
            caption: Adobe Illustrator
          - image: photoshop.png
            caption: Adobe Photoshop
          - image: superlab.png
            caption: Cedrus SuperLab 5
      - type: bio-timeline.html
        title: Bio
        bio_text: BIO TEXT GOES HERE
        timeline_events: 
          - image: assets/img/timeline/dartmouth-logo.png
            start: 2015.5
            end: 2019.5
            text: TEST DARTMOUTH TIMELINE TEXT
          - image: assets/img/timeline/cdl-logo.png
            start: 2017
            end: present
            text: TEST CDL TIMELINE TEXT
            
  - type: multipane-filter.html
    section_id: research
    background_style: bg-primary
    title: Research
    pane_type: publication-cards.html
    before_text: STATEMENT ABOUT RESEARCH INTERESTS & FOCUS HERE
    all_after_text: '&dagger;denotes equal contribution'
    panes:
      - title: Manuscripts
        filter: manuscript
        after_text: '&dagger;denotes equal contribution'
      - title: Posters
        filter: poster
        before_text: TEST POSTERS BEFORE TEXT
    items:
      - type: poster
        title: Exploring the evolving geometric structure of experiences and memories
        text: __Fitzpatrick P. C.__, Heusser A. C., Manning J. R. (2019). Exploring the evolving geometric structure
         of experiences and memories. *Society for Neuroscience Annual Meeting*. Chicago, IL.
        image: sfn-2019.png
      - type: manuscript
        title: How is experience transformed into memory?
        text: Heusser A. C.&dagger;, **Fitzpatrick P. C.**&dagger;, Manning J. R. (under revision). How is experience
         transformed into memory?. *bioRxiv*&#58; 409987.
        image: sherlock-white.png
      - type: poster
        title: Mapping between naturalistic experience and verbal recall
        text: __Fitzpatrick P. C.__, Heusser A. C., Manning J. R. (2018). Mapping between naturalistic experience and
         verbal recall. *Society for Neuroscience Annual Meeting*. San Diego, CA.
        image: sfn-2018.png
      - type: poster
        title: Capturing the geometric structure of our experiences and how we remember them
        text: Heusser A. C., __Fitzpatrick P. C.__, Manning J. R. (2018). Capturing the geometric structure of our
         experiences and how we remember them. *Conference on Cognitive Computational Neuroscience*. Philadelphia, PA.
        image: ccn-2018.png
      - type: poster
        title: The utility of speech-to-text software for transcription of verbal response data
        text: __Fitzpatrick P. C.__, Ziman K., Heusser A. C., Field C. E., Manning J. R. (2018). The utility of
         speech-to-text software for transcription of verbal response data. *Wetterhahn Science Symposium*. Hanover, NH.
        image: wetterhahn-2018a.png
      - type: poster
        title: Adaptive free recall&#58; Enhancing (or diminishing) memory
        text: Lee M., Chacko R., Whitaker E., **Fitzpatrick P. C.**, Field C. E., Ziman K., Bollinger B., Heusser A. C., Manning J. R. (2018). Adaptive free recall&#58; Enhancing (or diminishing) memory. *Wetterhahn Science
         Symposium*. Hanover, NH.
        image: wetterhahn-2018b.png
      - type: manuscript
        title: Is automatic speech-to-text transcription ready for use in psychological experiments?
        text: Ziman K., Heusser A. C., **Fitzpatrick P. C.**, Field C. E., Manning J. R. (2018). Is automatic
         speech-to-text transcription ready for use in psychological experiments?. *Behavior Research Methods*, 1-9.
        image: autofr-paper-white.png
      - type: manuscript
        title: Quail&#58; a Python toolbox for analyzing and plotting free recall data
        text: Heusser A. C., **Fitzpatrick P. C.**, Field C. E., Ziman K., Manning J. R. (2017). Quail&#58; a Python
         toolbox for analyzing and plotting free recall data. *The Journal of Open Source Software*, 2(18)&#58; 424.
        image: quail-white.png
        
  - type: multipane.html
    section_id: software
    background_style: bg-secondary
    title: Software
    before_text: STATEMENT ABOUT SOFTWARE DEVELOPMENT HERE
    after_text: ...and of course [this website!](https://github.com/paxtonfitzpatrick/paxtonfitzpatrick.github.io)
    panes:
      - type: software.html
        title: Open Source Software
        items:
          - title: gittracker
            role: sole developer, sole maintainer
            description: _(in development)_ a Python command-line application for tracking the states of all your local git
             repositories in
             one place. Built on top of [GitPython](https://github.com/gitpython-developers/GitPython), GitTracker can be
             run from anywhere on your computer to show `git status`-like information for each repository it's set to
             track. It features simple `git`-like commands; colorful, intuitive output at multiple verbosity levels; ability 
             to track nested submodules; and an automatic initial setup.
          - title: quail
            role: developer, lead maintainer
            description: a Python package that facilitates easy processing, analysis, and visualizing free-recall data
             from both list-learning and naturalistic memory experiments. Quail features a simple-yet-powerful data
             structure for encoding and recall data (the `Egg`) with convenient methods for performing common analyses, 
             generating beautiful plots, and easily filtering data in numerous ways. Quail also integrates with the
             [Google Cloud Speech API](https://cloud.google.com/speech-to-text/) for rapid audio decoding and supports 
             user-defined metrics for analyses in custom feature spaces.
          - title: cluster-tools-dartmouth
            role: developer, lead maintainer
            description: _(in development)_ a toolbox for easily deploying jobs on Dartmouth's high-performance computing
             cluster. Given a single Python script, `cluster-tools` will create a PBS script for each desired parameter
             combination and submit your jobs to run in parallel. Set values in a config file to pass commands to the
             Moab scheduler and TORQUE resource manager. Using [spurplus](https://github.com/Parquery/spurplus), 
             `cluster-tools` lets you submit jobs directly from your local machine and automatically re-queue those that
             fail due to scheduler issues.
          - title: autoFR
            role: developer, lead maintainer
            description: a verbal free-recall experiment that incorporates automatic speech-to-text processing by
             wrapping the [Google Cloud Speech API](https://cloud.google.com/speech-to-text/). The experiment is
             implemented using [jsPsych](http://www.jspsych.org/) and [psiTurk](https://psiturk.org/), isolated in a
             [Docker](https://www.docker.com/) container for easy deployment both locally and via 
             [Amazon Mechanical Turk](https://www.mturk.com/mturk/welcome). See the 
             [README](https://github.com/paxtonfitzpatrick/autoFR/blob/master/README.md) for instructions on how to run
             the experiment and access the data.
          - title: hypertools
            role: lead maintainer
            description: a Python package for visualizing and manipulating high-dimensional data. HyperTools was built
             with two goals in mind&#58; quickly visualizing a dataset to gain intuitions about its structure, and
             meticulously manipulating data to generate beautiful, animated, 3D figures. It features heavily customizable
             functions for alignment, normalization, clustering, transformations, dimensionality reduction, and
             plotting, while simultaneously allowing you to plot a corpus of text with a single function call. Hypertools
             integrates many familiar libraries including [matplotlib](https://matplotlib.org/), 
             [seaborn](https://seaborn.pydata.org/), and [scikit-learn](http://scikit-learn.org/), along with custom
             implementations of powerful tools such as 
             [hyperalignment](https://www.cell.com/neuron/fulltext/S0896-6273(11)00781-1?_returnURL=https%3A%2F%2Flinkinghub.elsevier.com%2Fretrieve%2Fpii%2FS0896627311007811%3Fshowall%3Dtrue) 
             and the 
             [Shared Response Model](https://papers.nips.cc/paper/5855-a-reduced-dimension-fmri-shared-response-model.pdf).
          - title: umap
            role: maintainer
            description: a Python package implementing the 
             [Uniform Manifold Approximation and Projection](https://arxiv.org/abs/1802.03426) algorithm. UMAP is a
             general-purpose dimensionality reduction technique based on ideas from manifold learning and topological
             data analysis, founded on three assumptions about the data&#58; **1**) the data is uniformly
             distributed on a Riemannian manifold; **2**) the Riemannian metric is locally constant (or can be
             approximated as such); and **3**) the manifold is locally connected. Given these assumptions, UMAP searches
             for a low-dimensional projection of the data whose fuzzy topological structure best matches that of
             the data in its original space. UMAP affords a number of notable advantages over similar techniques 
             (e.g., [_t_-SNE](https://en.wikipedia.org/wiki/T-distributed_stochastic_neighbor_embedding)) such as
             significantly greater speed and scalability, better preservation of the data's global structure, and the
             ability to transform new data into an existing embedding space. The Python implementation additionally
             supports a wide variety of metric and non-metric distance functions, supervised and semi-supervised
             dimensionality reduction, and an inverse transformation.
          - title: CDL-tutorials
            role: developer, maintainer
            description: a repository of useful, open-source tutorials on various computational tools, frameworks, 
             Python packages, and concepts frequently used in the [Contextual Dynamics Lab](http://www.context-lab.com/). 
             Check out the repo for a full list of available (or soon to be available) tutorials.
          - title: lab-manual
            role: developer, lead maintainer
            description: lab manual and associated source code for the 
             [Contextual Dynamics Lab](http://www.context-lab.com/) (PI&#58; 
             [Jeremy Mannning](https://pbs.dartmouth.edu/people/jeremy-rothman-manning)). In addition to lab policies and
             practices, it contains useful guides for tools and techniques frequently used in the CDL, as well as serves
             as the lab's on-boarding platform for new members. We've chosen to share it publicly in the hopes that others
             may find its format, content, or philosophy useful, or offer us feedback on how to improve.
          - title: CDL-bibliography
            role: maintainer
            description: a `bibtex` file containing nearly 6,000 references related to psychology, neuroscience, math, and 
             machine learning. The bibliography can be easily configured as a submodule for reference in LaTeX documents or
             added to [Overleaf](https://www.overleaf.com/) projects, and is updated regularly. The CDL bibliography
             is built off of a similar file created by the 
             [Computational Memory Lab at the University of Pennsylvania](http://memory.psych.upenn.edu/) (PI&#58; 
             [Mike Kahana](https://psychology.sas.upenn.edu/people/michael-kahana)).
          - title: psiturk-experiment-template
            role: sole developer, sole maintainer
            description: _(in development)_ a repository with two adaptable, complimentary templates for a human behavioral
             experiment, implemented via the [jsPsych](http://www.jspsych.org/) library and [psiTurk](https://psiturk.org/) 
             platform, and served from an isolated [Docker](https://www.docker.com/) environment. The `deploy-local` branch 
             provides a single, lightweight, [minbase debian image](https://hub.docker.com/_/debian) to house the
             experiment and a [SQLite](https://www.sqlite.org/index.html) database for local deployment. The `deploy-mturk` 
             branch offers a four-container setup ready for deployment via 
             [Amazon Mechanical Turk](https://www.mturk.com/)&#58; a debian image for the psiTurk experiment, an 
             [nginx](https://www.nginx.com/) server image for load balancing, a [MySQL](https://www.mysql.com/) image for
             storing data, and an [Adminer](https://www.adminer.org/) image for easily viewing and accessing data.
      - type: gists.html
        title: GitHub Gists
        items:
          - title: Docker container template for reproducible Python analyses
            description: Dockerfile template gist description here
            id: f00dfcce1293bede0b9c1f87b456e1b6
        
  - type: contact.html
    section_id: contact
    background_style: bg-primary
    title: Contact
    email: Paxton.C.Fitzpatrick@Dartmouth.edu
    phone: (717) 439-3999
    address: 416 Moore Hall, Dartmouth College, Hanover, NH 03755
    map_embed: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d721.038682728594!2d-72.28847647071619!3d43.70733339869497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cb4c9c361e1ddb1%3A0x8b2bba0d5b098fa6!2sMoore%20Psychology%20Bldg%2C%20Hanover%2C%20NH%2003755!5e0!3m2!1sen!2sus!4v1591571050608!5m2!1sen!2sus
      
  - type: timeline.html
    section_id: timeline
    title: Major Achievements!
    background_style: bg-dark text-primary
    last_image: assets/img/timeline-end.png
    actions:
      - image: assets/img/portfolio/thumbnails/1.jpg
        title: >+
          2017-2018
          **Humble Beginnings**
        text: >-
          We begun with small group of people willing to work hard and make our
          teaching skills worth , in front of all others!
      - image: assets/img/portfolio/thumbnails/2.jpg
        title: >+
          November 2019
          An Coaching started
        text: >-
          We started to gather like minded people and started our stategies
          and future plans to them. As a result , interested people joined us!
          
  - type: services.html
    section_id: services
    #background_style: bg-info
    title: At Your Service
    services:
      - title: Sturdy Templates
        text: Our templates are updated regularly so they don't break.
        icon: fa-gem text-info
        url: https://startbootstrap.com/
      - title: Ready to Ship
        text: You can use this theme as is, or you can make changes!
        icon: fa-paper-plane
      - title: Up to Date
        text: We update dependencies to keep things fresh.
        icon: fa-laptop-code
      - title: Made with Love
        text: You have to make your websites with love these days!
        icon: fa-github
        icon_type: fab
      - title: Other 1
        text: Some not-so long text here.
        icon: fa-github-alt
        icon_type: fab
      - title: Other 2
        text: Some not-so long text here.
        icon: fa-python
        icon_type: fab
        
  - type: call-to-action.html
    section_id: action
    background_style: bg-primary
    title: We've got what you need!
    text: Start Bootstrap has everything you need to get your new website up and running in no time! All of the templates and themes on Start Bootstrap are open source, free to download, and easy to use. No strings attached!
    actions:
      - title: Get Started!
        url: '#'
        class: btn-light

  - type: portfolio.html
    # this section has always ID 'portfolio'
    #section_id: portfolio
    #background_style: bg-dark
    projects:
      - title: Project 1
        text: This is a very short project description.
        # the images are located in:
        # img/portfolio/fullsize
        # img/portfolio/thumbnails
        icon: 1.jpg
        url: '#'
      - title: Project 2
        text: This is a very short project description.
        icon: 2.jpg
        url: '#'
      - title: Project 3
        text: This is a very short project description.
        icon: 3.jpg
        url: '#'
      - title: Project 4
        text: This is a very short project description.
        icon: 4.jpg
        url: '#'
      - title: Project 5
        text: This is a very short project description.
        icon: 5.jpg
        url: '#'
      - title: Project 6
        text: This is a very short project description.
        icon: 6.jpg
        url: '#'

  - type: aside.html
    section_id: aside
    title: Free Download at Start Bootstrap!
    actions:
      - title: Download Now!
        url: https://startbootstrap.com/themes/creative/
        class: btn-light

  - type: members.html
    section_id: members
    title: Our Crew!
    background_style: bg-info text-white
    members:
      - title: Christina M. Aponte
        text: Singer and Songwriter
        image: assets/img/members/person1.jpg
        url: '#'
      - title: Gary D. Stevens
        text: Bass guitar.
        image: assets/img/members/person2.jpg
        url: '#'
      - title: Devon J. Fletcher
        text: Lead guitar.
        image: assets/img/members/person3.jpg
        url: '#'
      - title: Todd E. Anderson
        text: Drums, percussion.
        image: assets/img/members/person5.jpg
        url: '#'
      - title: Daniel T. Riley
        text: Musician, songwriter, producer.
        image: assets/img/members/person6.jpg
        url: '#'
      - title: Ella P. Walter
        text: PR.
        image: assets/img/members/person7.jpg
        url: '#'

---
