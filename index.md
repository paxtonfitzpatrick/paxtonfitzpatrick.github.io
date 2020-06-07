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
          - image: psiturk.jpg
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
        title: Capturing the evolving geometric and neural structures of experiences and memories
        text: __Fitzpatrick P. C.__, Heusser A. C., Manning J. R. (2019). Capturing the evolving geometric and neural
         structures of experiences and memories. *Society for Neuroscience Annual Meeting*. Chicago, IL.
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
        
  - type: software.html
    section_id: software
    background_style: bg-secondary
    title: Software
    before_text: STATEMENT ABOUT SOFTWARE DEVELOPMENT HERE
    after_text: ...and of course [this website!](https://github.com/paxtonfitzpatrick/paxtonfitzpatrick.github.io)
    items:
      - title: gittracker
        role: sole developer, sole maintainer
        description: some [description](https://www.google.com) about gittracker package some description about
         gittracker package some description about gittracker package some description about gittracker package some
         description about gittracker package some description about gittracker package some description about
         gittracker package some description about gittracker package some description about gittracker package some
         description about gittracker package some description about gittracker package
      - title: quail
        role: developer, lead maintainer
        description: some description about quail package
      - title: cluster-tools-dartmouth
        role: developer, lead maintainer
        description: cluster tools description
      - title: autoFR
        role: developer, lead maintainer
        description: some description about autoFR package
      - title: hypertools
        role: lead maintainer
        description: hypertools description
      - title: umap
        role: maintainer
        description: UMAP description
      - title: CDL-tutorials
        role: developer, maintainer
        description: CDL tutorials description
      - title: lab-manual
        role: developer, lead maintainer
        description: CDL lab manual description
      - title: CDL-bibliography
        role: developer, maintainer
        description: CDL bibliography description
      - title: psiturk-experiment-template
        role: sole developer, sole maintainer
        description: psiturk example template description here
      - title: Docker container template for reproducible Python analyses
        role: (GitHub gist)
        description: Dockerfile template gist description here

  - type: contact.html
    section_id: contacts
    title: Let's Get In Touch!
    text: >-
      Ready to start your next project with us? Give us a call or send us an email
      and we will get back to you as soon as possible!
    actions:
    - title: +1 (202) 555-014
      icon: fa-phone
    - title: E-Mail
      icon: fa-envelope
      url: mailto:contact@yourwebsite.com
    - title: Twitter
      icon: fa-twitter
      icon_type: fab
      url: '#'
    - title: Facebook
      icon: fa-facebook
      icon_type: fab
      url: '#'
      
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
