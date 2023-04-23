<?php

function bhaa_setup()
{
    /* Register different size thumbnail images */
    add_theme_support('post-thumbnails');
    add_theme_support('editor-styles');

    /* Include custom editor styles, so the backend looks like
	 * the front end. */
    add_editor_style('editor-style.css');
}
add_action('after_setup_theme', 'bhaa_setup');

function bhaa_admin_typography()
{
    echo '<link rel="stylesheet" type="text/css" href="https://cloud.typography.com/7844898/6540412/css/fonts.css" />';
}
add_action('admin_head', 'bhaa_admin_typography');

/**
 * Register an oembed for amazon product links
 *
 * Direct link: 
 * https://www.amazon.com/gp/product/1610393384/ref=as_li_qf_asin_il_tl?ie=UTF8&tag=bhaa69-20&creative=9325&linkCode=as2&creativeASIN=1610393384&linkId=4e4341ec2f35d53262da1e82d5b714d0
 */
function bh_support_amazon_inline_embed($matches, $attr, $url, $rawattr)
{
    return "HELLO AMAZON LINK";
}
//wp_embed_register_handler('exa-inline-link', '*(?:http|https)://amazon.com/*', 'bh_support_amazon_inline_embed');

remove_filter('template_redirect', 'redirect_canonical');


/**
 * Pre-load menus defined in theme-definition.json
 */
add_filter("webpress_preloaded", function ($array) {
    global $wp;

    $path = $wp->request;

    if ($path) {
        $request['path']  = $path;
        $array["/webpress/v1/template?path=%2F$path%2F"] = wp_json_encode(webpress_template_request($request));
    } else {
        $request['path']  = "/";
        $array['/webpress/v1/template?path=%2F'] = wp_json_encode(webpress_template_request($request));
    }

    if ($path && $path == 'events' || $path == 'get-involved') {
        bhaa_preload_page_slug($path, $array);
    }

    $cached_array = [];
    if (!$path || $path == 'about' || $path == 'updates' || $path == 'newsletter' || $path == 'store') {
        $cached_array = wp_cache_get('bhaa-index-preload', 'webpress');
        if ($cached_array === false) {
            $cached_array = [];
            bhaa_preload_page_slug('about', $cached_array);
            bhaa_preload_page_slug('updates', $cached_array);
            bhaa_preload_page_slug('newsletter', $cached_array);
            bhaa_preload_page_slug('store', $cached_array);
            bhaa_preload_page(2, $cached_array);
            bhaa_preload_posts($cached_array);
            wp_cache_set('bhaa-index-preload', $cached_array, 'webpress', 60 * 60 * 24 * 7);
        }
    }
    return array_merge($array, $cached_array);
});

function bhaa_preload_posts(&$array)
{
    $key = '/wp/v2/posts';
    $request = new WP_REST_Request('GET', '/wp/v2/posts');
    $response = rest_do_request($request);
    $server = rest_get_server();
    $data = $server->response_to_data($response, false);
    $array[$key] = wp_json_encode($data);
}

function bhaa_preload_page($id, &$array)
{
    $key = "/wp/v2/pages/$id";
    $request = new WP_REST_Request('GET', "/wp/v2/pages/$id");
    $response = rest_do_request($request);
    $server = rest_get_server();
    $data = $server->response_to_data($response, false);
    $array[$key] = wp_json_encode($data);
}

function bhaa_preload_page_slug($slug, &$array)
{
    $key = "/wp/v2/pages?slug=$slug";
    $request = new WP_REST_Request('GET', '/wp/v2/pages');
    $request->set_query_params(['slug' => $slug]);
    $response = rest_do_request($request);
    $server = rest_get_server();
    $data = $server->response_to_data($response, false);

    if ($data[0]['featured_media'] != null && $data[0]['featured_media']  != 0) {
        bhaa_preload_media($data[0]['featured_media'], $array);
    }

    $array[$key] = wp_json_encode($data);
}
function bhaa_preload_media($id, &$array)
{
    $key = "/wp/v2/media/$id";
    $request = new WP_REST_Request('GET', "/wp/v2/media/$id");
    $response = rest_do_request($request);
    $server = rest_get_server();
    $data = $server->response_to_data($response, false);
    $array[$key] = wp_json_encode($data);
}

function bust_redis_cache_on_database_change()
{
    wp_cache_delete('bhaa-index-preload', 'webpress');
}
add_action('save_post', 'bust_redis_cache_on_database_change');
