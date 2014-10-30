<?php
/**
 * @file
 * Front page template for Mark-a-Spot
 */
?>

<div class="navbar-wrapper">
  <div class="navbar navbar-inverse navbar-static-top" role="navigation">
    <div class="container-fluid">
      <div class="navbar-header">
        <?php if ($logo): ?>
          <a class="logo navbar-btn pull-left" href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>">
            <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" />
          </a>
        <?php endif; ?>

        <?php if (!empty($site_name)): ?>
          <a class="name navbar-brand" href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>"></a>
        <?php endif; ?>


      </div>


      <?php if (!empty($primary_nav) || !empty($secondary_nav) || !empty($page['navigation'])): ?>
        <div class="collapse navbar-collapse">
          <nav class="nav navbar-nav">
            <?php if (!empty($primary_nav)): ?>
              <?php print render($primary_nav); ?>
            <?php endif; ?>
            <?php if (!empty($secondary_nav)): ?>
              <?php print render($secondary_nav); ?>
            <?php endif; ?>
            <?php if (!empty($page['navigation'])): ?>
              <?php print render($page['navigation']); ?>
            <?php endif; ?>
          </nav>
        </div>
      <?php endif; ?>
    </div>
  </div>
</div>



<div id="map_wrapper_splash">
<img class="img-responsive container" src="profiles/markaspot/themes/ntxuva/images/main.jpg" alt="" >
<div class="mapheader masthead">
  <div class="container stage">
    <div>
      <div class="col-md-12">
        <div class="welcome-text well">
          <?php
            // If you don't want bootstrap carousel to welcome visitors
            // you can use this block:
            $block = module_invoke('markaspot_default_content', 'block_view', 'welcome');
            print render($block['content']);
          ?>
        </div>
        <div class="welcome">
          <?php
            $block = module_invoke('markaspot_default_content', 'block_view', 'add_reports');
            print render($block['content']);
          ?>

        </div>
      </div>

    </div>
  </div>
</div>

</div>

<div class="section-container">
  <div class="section-row">
    <div class="col-wrapper">
    	<div class="custom-col">
    		<span><img src="profiles/markaspot/themes/ntxuva/images/icon_one.png"></span>
    		<h2>Identifica</h2>
    		<p>dwfwef ewf ew fwe f wef ewf ewf wefwe</p>
    	</div>
    	<div class="custom-col">
    		<span><img src="profiles/markaspot/themes/ntxuva/images/icon_two.png"></span>
    		<h2>Reporta</h2>
    		<p>dwfwef ewf ew fwe f wef ewf ewf wefwe</p>
    	</div>
    	<div class="custom-col">
    		<span><img src="profiles/markaspot/themes/ntxuva/images/icon_three.png"></span>
    		<h2>Acompanha</h2>
    		<p>dwfwef ewf ew fwe f wef ewf ewf wefwe</p>
    	</div>
    </div>
  </div>
</div>

<footer class="footer navbar-inverse">
  <?php print render($page['footer']); ?>
</footer>
