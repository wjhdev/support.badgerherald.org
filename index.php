<!DOCTYPE html>

<?php define('WEBPRESS_STENCIL_NAMESPACE', 'bhorg'); ?>
<html dir="ltr" lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0">
  <title>
    <?php echo wp_title("&middot;",true,"right"); ?>
  </title>
  <link href="https://fonts.googleapis.com/css?family=Cairo:600,900|Eczar:500,700&display=swap" rel="stylesheet">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
  <webpress-theme id="theme"></webpress-theme>

  <script>
  var element = document.getElementById('theme')
  element.context = webpress
  </script>

  <?php wp_footer(); ?>

</body>
</html>
